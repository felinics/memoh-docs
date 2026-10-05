# サーバーデプロイ（Server Deploy）

Server Deploy は Memoh のセルフホスト型サーバーデプロイ形態です。常時稼働・複数人・マルチテナント・リモートアクセス、あるいはデスクトップがオフラインの間も Bot に外部チャネルを担当させたい場面に向いています。

このページでは Docker Compose 版の Server Deploy を説明します。ローカルのネイティブクライアントをインストールするなら [Desktop](./desktop.md) を見てください。

既定の構成には PostgreSQL、メモリベクトル用の pgvector データベース、ワンショットのマイグレーションジョブ、メインサービス（workspace backend を明示設定、エージェントも同一プロセス）、チャネル worker、ウェブフロントエンドが含まれます。データベースは PostgreSQL のみ対応です。

公式 Compose スタックは `containerd` workspace backend を使います。server イメージは内蔵 containerd を起動し、Bot ワークスペースに必要な runtime ファイルをマウントします。Docker Engine と Apple バックエンドは [Workspace バックエンド](./workspace-backends.md)を参照してください。

## サービス構成

Compose には複数のサービスがあります。既定で起動するものと、`--profile` で有効化するものがあります：

| サービス | Profile | 説明 |
|----------|---------|------|
| **server** | *（コア）* | メインサービス。設定されたコンテナランタイムバックエンドを使い、エージェントも同一プロセス |
| **channel** | *（コア）* | チャネル worker（`memoh-channel`）。各プラットフォームの接続と webhook を保持し、内部 RPC でメインサービスと通信 |
| **web** | *（コア）* | ウェブクライアント（Vue 3） |
| **postgres** | *（コア）* | PostgreSQL（主データ） |
| **pgvector** | *（コア）* | `pgvector` 付き PostgreSQL。任意のメモリベクトル用。[内蔵メモリ](../integrations/providers/memory/builtin.md)を参照 |
| **migrate** | *（コア、ワンショット）* | メインサービス起動前に `memoh-server migrate up` を実行 |
| **webhook-tunnel** | `webhook-tunnel` | 任意の `cloudflared` クイックトンネル。チャネル worker の webhook リスナーを公開アドレスに出す |
| **connect-it** | `connectors` | 同居デプロイの [Connect-It](https://github.com/memohai/connect-it)。Bot の[コネクター](./connectors.md)を支える（下記参照） |


### Connect-It コネクター

**connect-it** コンテナが動かすのは [Connect-It](https://github.com/memohai/connect-it)——Bot の[コネクター](./connectors.md)の裏側にあるサービスで、OAuth または API Key で GitHub・Notion のようなサードパーティサービスを Bot につなぎます。Memoh の PostgreSQL を共用し、データは独立した `connect_it` スキーマに隔離され、マイグレーションは自前で管理します。

インストールスクリプトが Connect-It の面倒を一貫して見ます：

- **新規インストール**では既定で有効（`MEMOH_CONNECT_IT_MODE=embedded`、Compose profile `connectors`）。インストール直後からコネクター機能が使え、Connect-It の管理コンソールでトークンを手動で作って設定に書き戻す必要はありません。
- **アップグレード**では、以前から有効だった場合を除き無効のまま維持します。有効化したければ `MEMOH_CONNECT_IT_MODE=embedded` を付けてインストールスクリプトをもう一度実行してください。
- 一式の資格情報——管理コンソールのパスワード、AES キー、cookie secret、サーバー間 API トークン——は一度だけ生成されて `.env` に書かれ、アップグレードでも再利用されます。後からモードを切り替えても既存の接続は失われません。

インストール後、Connect-It の管理コンソールは `http://localhost:8421` です（アカウント `admin`、パスワードは生成されたもの。インストール終了時に表示され、`.env` にも保存されます）。

注意点が 2 つあります：

- **OAuth コールバック**は Connect-It の公開アドレスを通ります。既定は `http://localhost:8421` です。Memoh に他のマシンからアクセスするなら、`MEMOH_CONNECT_IT_PUBLIC_BASE_URL` をそれらのマシン（および OAuth プロバイダー）から届くアドレスに設定してください。
- **中国本土ミラー**：Connect-It のイメージは ghcr.io にあり、memoh.cn ミラーの対象外です。ghcr.io から取得できない場合は `MEMOH_CONNECT_IT_MODE=disabled` でスキップしてください。

## 前提条件

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose v2](https://docs.docker.com/compose/install/)
- Git

## ワンライナー Server Deploy（推奨）

公式スクリプト（Docker と Compose はインストール済みの前提）：

```bash
curl -fsSL https://memoh.sh | sh
```

インストールスクリプトは一般ユーザーで実行し、スクリプト全体に `sudo` を
かけないでください。Docker に昇格が必要な場合、スクリプトは `docker`
コマンドに対してだけ `sudo` を使います。どうしても root でスクリプト全体を
実行するなら、明示的に `MEMOH_ALLOW_ROOT_INSTALL=true` を設定する必要があります。

スクリプトは次を行います：Docker/Compose の確認；新規・アップグレード・再インストールの判定；対話での設定質問（ワークスペース、データディレクトリ、管理者、JWT、Postgres パスワード、workspace backend の案内）；アップグレード時は既存の `config.toml` を自動で再利用し、データベース資格情報と既存 PostgreSQL volume の整合を維持；クリーン再インストールを選べば Memoh のコンテナ・volume・network を削除；GitHub から最新リリースを取得してクローン；Docker テンプレートから `config.toml` を生成；レガシーな SQLite インストールのアップグレードは拒否（PostgreSQL のみ対応。再インストールを選ぶ必要あり）；Memoh イメージをリリース版にピン留め（例：`v0.13.0` はイメージタグ `0.13.0`）；新規インストールでは同居の Connect-It を立ち上げ——資格情報は一度だけ生成して `.env` に保存し、`connectors` profile を追加（[上記参照](#connect-it-コネクター)）；起動に失敗したらデータベース・マイグレーション・server の直近ログを表示。

**サイレントインストール**（すべて既定値、質問なし）：

```bash
curl -fsSL https://memoh.sh | sh -s -- -y
```

サイレント時の既定：ワークスペース `~/memoh`；データ `~/memoh/data`；管理者 `admin` / `admin123`；JWT はランダム；データベースは PostgreSQL（`pgvector` サイドカー込み）；Postgres パスワード `memoh123`；webhook トンネルは `MEMOH_WEBHOOK_TUNNEL_MODE=external` を設定しない限り無効。

サイレントモードで既存の Memoh インストールが見つかると、既定で**アップグレード**に入り、以前の `config.toml` を再利用します。Docker の痕跡だけ見つかって再利用できる `config.toml` がない場合、スクリプトは終了し、再インストールの明示指定を求めます。

**強制クリーン再インストール**（起動前に Memoh の Docker データを削除）：

```bash
curl -fsSL https://memoh.sh | MEMOH_INSTALL_MODE=reinstall sh
```

引数でインストールモードを指定することもできます：

```bash
curl -fsSL https://memoh.sh | sh -s -- --install-mode reinstall
```

**Cloudflare クイックトンネルでチャネル webhook を公開**（公開コールバックアドレスが必要なプラットフォーム向け）：

```bash
curl -fsSL https://memoh.sh | MEMOH_WEBHOOK_TUNNEL_MODE=external sh
```

**バージョン指定：**

```bash
curl -fsSL https://memoh.sh | sh -s -- --version v0.13.0
```

または：

```bash
curl -fsSL https://memoh.sh | MEMOH_VERSION=v0.13.0 sh
```

**中国本土ミラー**（イメージ取得が遅いとき）：

```bash
curl -fsSL https://memoh.sh | USE_CN_MIRROR=true sh
```

> 環境変数は組み合わせられます。例：`curl -fsSL https://memoh.sh | MEMOH_VERSION=v0.13.0 USE_CN_MIRROR=true sh`。

### インストールスクリプトの引数

`sh -s --` の後に次の引数を渡せます：

| 引数 | 説明 |
|------|------|
| `-y`、`--yes` | 既定値でサイレントインストール。TTY がない場合もスクリプトは自動でサイレントモードに切り替わります。 |
| `--version <tag>`、`--version=<tag>` | 指定した Git タグをインストール。例 `v0.13.0`。 |
| `--install-mode <mode>`、`--install-mode=<mode>` | `auto`、`fresh`、`upgrade`、`reinstall` から選択。 |
| `--database-driver <driver>`、`--database-driver=<driver>` | 互換性のため残置。`postgres` のみ対応。 |
| `--container-backend <backend>`、`--workspace-backend <backend>` | 設定に書き込む workspace backend。ワンライナーの Docker Compose インストールは `containerd` のみ対応。`docker` や `apple` は手動デプロイで。 |

## 手動インストール

```bash
git clone https://github.com/felinics/Memoh.git
cd Memoh
cp conf/app.docker.toml config.toml
```

最低限、`config.toml` の次を変更します：

- `admin.password`
- `auth.jwt_secret`（`openssl rand -base64 32` などで生成可）
- `postgres.password`（環境変数 `POSTGRES_PASSWORD` と一致させる）

その後コアサービスを起動します：

```bash
POSTGRES_PASSWORD=あなたのDBパスワード docker compose up -d
```

同居の Connect-It が必要なら `--profile connectors`、Cloudflare webhook サイドカーが必要なら `--profile webhook-tunnel` を追加します。

> macOS や、ユーザーがすでに `docker` グループに入っている場合、通常 `sudo` は不要です。

> **重要**：`docker-compose.yml` は既定で `./config.toml` をマウントします。先にファイルを作ってから `up` しないと起動しません。

手動デプロイで[コネクター](./connectors.md)を有効にするには、Connect-It の資格情報を自分で生成して `connectors` profile を付けます：

```bash
MEMOH_CONNECT_IT_BASE_URL="http://connect-it:8421" \
MEMOH_CONNECT_IT_API_TOKEN="cit_$(openssl rand -hex 32)" \
MEMOH_CONNECT_IT_SECRET_KEY="1:$(openssl rand -hex 32)" \
MEMOH_CONNECT_IT_COOKIE_SECRET="$(openssl rand -base64 32)" \
MEMOH_CONNECT_IT_ADMIN_PASSWORD="自分で決めたパスワード" \
POSTGRES_PASSWORD=あなたのDBパスワード \
docker compose --profile connectors up -d
```

これらの値は再起動をまたいで一貫している必要があります（`.env` に置くなど）——API トークンは Memoh が Connect-It に提示する資格情報で、キーは保存される資格情報の暗号化に使われます。ワンライナースクリプトはこれらをすべて自動処理します。

### 中国本土ミラー

Docker Hub からの取得が難しい場合、`config.toml` の `registry` 行のコメントを外します：

```toml
[container]
registry = "memoh.cn"
image_pull_policy = "if_not_present" # if_not_present、always または never
```

さらに中国向け overlay を重ねます：

```bash
docker compose -f docker-compose.yml -f docker/docker-compose.cn.yml up -d
```

ワンライナースクリプトは `USE_CN_MIRROR=true` のときこの一式を処理します。

## アクセス先

起動後：

| サービス | アドレス |
|----------|----------|
| ウェブ | http://localhost:8082 |
| API | http://localhost:8080 |
| Connect-It 管理コンソール*（`connectors` profile 時）* | http://localhost:8421 |

既定のログインは `admin` / `admin123` です（`config.toml` で必ず変更してください）。Connect-It 管理コンソールのアカウントは `admin` と、インストールスクリプトが生成したパスワードです（インストール終了時に表示され、`.env` にも保存）。初回のイメージ取得と初期化には 1〜2 分かかることがあります。

## 設定の概要

`config.toml` の主なセクションはおおよそ次のとおりです：

| セクション | 意味 |
|------------|------|
| `[log]` | レベルと形式（`info`/`debug`；`text`/`json`） |
| `[server]` | リッスンアドレス。既定 `:8080` |
| `[admin]` | 管理者アカウント |
| `[auth]` | JWT と有効期限 |
| `timezone` | サーバーのタイムゾーン。既定 `UTC` |
| `[database]` | データベースドライバー。`postgres` のみ対応 |
| `[container]` | Workspace backend の選択と、共通のワークスペースイメージ・取得ポリシー・データパス・runtime パス・CNI 設定 |
| `[containerd]` | socket と namespace |
| `[docker]` | Docker Engine host の上書き。空なら Docker の環境変数か既定 socket |
| `[apple]` | Apple バックエンドの socktainer socket と binary の上書き |
| `[postgres]` | PostgreSQL 接続 |
| `[pgvector]` | 任意の pgvector データベース。メモリベクトル用（`enabled`、host、port、user、password、database、sslmode） |
| `[internal_rpc]` | メインサービス／チャネル worker を分離デプロイする際の RPC アドレスと共有シークレット |
| `[webhook_tunnel]` | webhook トンネルのモード（`disabled` か `external`）と `public_base_url` |
| `[registry]` | モデルプロバイダー定義のディレクトリ |
| `[connect_it]` | [コネクター](./connectors.md)用の Connect-It アドレス（`base_url`、`api_token`）。両方空ならこの機能は無効。Compose 環境では `MEMOH_CONNECT_IT_BASE_URL` / `MEMOH_CONNECT_IT_API_TOKEN` が上書き |
| `[web]` | フロントエンドの host/port |
| `[agent]` | ツール出力の切り詰め上限：`tool_output_max_bytes`（既定 65536）、`tool_output_max_lines`（既定 2000）、`system_files_max_bytes`（既定 32768）。超過時は先頭と末尾を残し、盲目的に切らない。 |
| `[session_runtime]` | マルチインスタンスデプロイのセッション状態バックエンド。下の[マルチインスタンスデプロイ](#マルチインスタンスデプロイ)を参照 |

## マルチインスタンスデプロイ

単一インスタンスならこの節は一切気にしなくて構いません——セッション状態は既定でプロセスメモリにあり、永続的な台帳はデータベースにあります。

ロードバランサーの背後で複数の Memoh server インスタンスを動かすには、agent turn のセッション状態を共有バックエンドへ移す必要があります。`[session_runtime]` ブロックを設定します：

```toml
[session_runtime]
backend = "redis"   # "memory"（既定、単一インスタンス専用）または "redis"
cluster = true       # マルチインスタンスモードの宣言。backend = "redis" が必須
# state_ttl = "24h"
# owner_lease_ttl = "30s"

[session_runtime.redis]
url = "redis://redis:6379/0"
# key_prefix = "memoh:session_runtime:"
```

注意：

- `redis` は Redis プロトコルを指し、Valkey でも使えます。同梱の Docker Compose スタックに Redis/Valkey サービスは**含まれない**ので、自分で追加してください。
- `cluster = true` を `memory` バックエンドと組み合わせると起動時に即失敗します。これは意図した設計です。
- Redis バックエンド使用時、server は起動時にヘルスチェックを行い、接続できなければ起動を拒否します。

## よく使うコマンド

> Linux でユーザーが `docker` グループに入っていない場合は、コマンドに `sudo` を付けてください。

```bash
docker compose up -d           # 起動
docker compose down            # 停止
docker compose down -v         # 停止して Memoh の Docker データを削除
docker compose logs -f         # ログを見る
docker compose ps              # 状態
docker compose pull && docker compose up -d  # イメージ更新して再起動
```

## 環境変数

| 変数 | 既定 | 説明 |
|------|------|------|
| `POSTGRES_PASSWORD` | `memoh123` | `config.toml` の `postgres.password` と一致させる必要あり |
| `MEMOH_CONFIG` | `./config.toml` | 設定ファイルのパス |
| `MEMOH_DATA_DIR` | `~/memoh/data` | インストールスクリプトが `.env` に書くデータディレクトリ。現状は今後の bind mount 対応のための予約。 |
| `MEMOH_VERSION` | 最新リリース | インストールする git タグ。例 `v0.13.0`。Memoh イメージも先頭の `v` を外したタグ（例 `0.13.0`）にピン留めされる |
| `MEMOH_INSTALL_MODE` | `auto` | インストールモード：`auto`、`fresh`、`upgrade`、`reinstall` |
| `MEMOH_DATABASE_DRIVER` | `postgres` | 互換性のため残置。`postgres` のみ対応 |
| `MEMOH_CONTAINER_BACKEND` | `containerd` | Workspace backend。ワンライナーの Docker Compose インストールは `containerd` のみ対応。`docker`、`apple` は手動デプロイで。 |
| `MEMOH_ALLOW_ROOT_INSTALL` | `false` | インストールスクリプト自体を root で実行することを許可。未設定のまま一般ユーザーで実行するのを推奨。 |
| `MEMOH_WEBHOOK_TUNNEL_MODE` | `disabled` | `external` にすると `webhook-tunnel` profile（Cloudflare `cloudflared` サイドカー）を追加し、チャネル webhook に公開アドレスを与える。 |
| `USE_CN_MIRROR` | `false` | 中国本土ミラーを使うかどうか |
| `MEMOH_CONNECT_IT_MODE` | 新規は `embedded`；アップグレードは現状維持 | `embedded` で同居 Connect-It を実行（`connectors` profile）；`disabled` でコネクター無効 |
| `MEMOH_CONNECT_IT_PUBLIC_BASE_URL` | `http://localhost:8421` | コネクターの OAuth コールバックと管理コンソールの公開アドレス。Memoh に他のマシンからアクセスするなら必須 |
| `MEMOH_CONNECT_IT_PORT` | `8421` | Connect-It コンテナのホスト側ポート |
| `MEMOH_CONNECT_IT_IMAGE` | リリースに追従してピン留め | Connect-It イメージの上書き |

その他の `MEMOH_CONNECT_IT_*`（管理コンソールのパスワード、キー、cookie secret、API トークン）はインストールスクリプトが一度だけ生成して `.env` に保存する資格情報で、通常は手動で設定する必要はありません。
