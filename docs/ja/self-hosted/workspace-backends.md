# Workspace バックエンド

どの Memoh Bot もワークスペースの中で働きます。ワークスペースは隔離されたコンテナにも、Desktop／ローカル構成で明示的に信頼したホスト上のディレクトリにもなります。バックエンドは、ワークスペースがどこで動くか、そして隔離・ネットワーク・スナップショット・display 機能が使えるかどうかを決めます。

## コンテナバックエンド

コンテナワークスペースは `config.toml` で設定します：

```toml
[container]
backend = "containerd" # containerd、docker または apple
```

| Backend | 向いている場面 | 説明 |
|---------|----------------|------|
| `containerd` | Docker Compose の Server Deploy、Linux サーバー、開発環境 | 公式 server イメージの既定。CNI ネットワーク、スナップショット、CDI デバイス、provider sidecar に対応し、ローカルワークスペース機能が最も充実。 |
| `docker` | Memoh をホスト上で直接動かし、ホストに Docker Engine がある | ホストの Docker API を使用。`container.runtime_dir` のような bind mount のソースパスは Docker ホスト上に実在する必要がある。 |
| `apple` | macOS でのローカルテスト | socktainer と Apple Containerization 経由。provider sidecar は非対応。 |

ワンライナーの Docker Compose Server Deploy は `containerd` に固定されています。これは意図的な仕様です：server イメージは内蔵 containerd を起動し、Bot ワークスペースに必要な runtime ファイルをマウントします。`docker` と `apple` は、ホストの runtime パスを自分で管理できる手動デプロイに向いています。

## 信頼済みローカルワークスペース

Desktop とローカル開発では、コンテナバックエンドに加えて信頼済みローカルワークスペースを有効化できます：

```toml
[local]
enabled = true
```

信頼済みローカルワークスペースは、server プロセスの権限でホスト上で直接動きます。個人のデスクトップワークフローやローカル開発には向きますが、**コンテナ隔離はありません**。信頼できない server デプロイでは local ワークスペースを有効にしないでください。

Bot が local ワークスペースを使っている場合、コンテナデスクトップやコンテナ display セッションに依存する UI 機能は非表示または利用不可になることがあります。

## containerd

```toml
[container]
backend = "containerd"
default_image = "debian:bookworm-slim"
image_pull_policy = "if_not_present"
snapshotter = "overlayfs"
data_root = "/opt/memoh/data"
runtime_dir = "/opt/memoh/runtime"
cni_bin_dir = "/opt/cni/bin"
cni_conf_dir = "/etc/cni/net.d"

[containerd]
socket_path = "/run/containerd/containerd.sock"
namespace = "default"
```

公式の Docker Compose スタックと、containerd に直接つなぐ Linux ホストの両方がこれを使います。

## Docker

```toml
[container]
backend = "docker"
default_image = "debian:bookworm-slim"
runtime_dir = "/opt/memoh/runtime"
data_root = "/opt/memoh/data"

[docker]
# 空のままにすると Docker の標準的な環境検出を使います：DOCKER_HOST、
# DOCKER_TLS_VERIFY、DOCKER_CERT_PATH、またはプラットフォーム既定の socket。
host = ""
```

Docker バックエンドは標準の Docker 環境経由で Docker Engine に接続します。Memoh サービスがホスト上で直接動くデプロイや、Docker bind mount のソースパスが実際のホストパスであることを保証できる環境に向いています。

公式 Docker Compose インストールの `containerd` を、Docker socket と `runtime_dir` のホストパスを両方きちんと処理しないまま `docker` に変えないでください。ワークスペースコンテナは作れても、bridge runtime ファイルを受け取れなくなることがあります。

## Apple

```toml
[container]
backend = "apple"

[apple]
socket_path = ""
binary_path = ""
```

Apple バックエンドは socktainer と Apple Containerization による macOS ローカルテスト用です。まだ実験的な機能で、provider sidecar には対応していません。

## Display・Browser Use・Computer Use

コンテナワークスペースは display runtime を提供できます：Xvnc/RFB がワークスペースのデスクトップ表示と入力の基盤になり、ヘッド付き Chrome/Chromium が CDP を提供し、クライアントの **Desktop** ペインが WebRTC でセッションを開きます。

ウェブサイトが本物のグラフィカルブラウザを要求するときは、この経路を使います。Headless Playwright も通常のワークスペースコマンドとして実行できますが、Browser Use と Computer Use はヘッド付きワークスペースデスクトップを前提にしています。

local ワークスペースには同等のコンテナデスクトップ隔離はありません。ツールレベルの違いは [Browser / Computer Use](../guides/browser-computer-use.md) を参照してください。

## ネットワークと overlay

Bot のネットワークは二層あります：

- runtime network：ワークスペースを基盤のコンテナ／Pod ネットワークにつなぐ。
- overlay provider：Tailscale や NetBird などで、個別の Bot にプライベートネットワークを追加できる。

バックエンドごとに対応が異なります：

| Backend | Runtime network | Overlay sidecar | CDI デバイス | コンテナ display |
|---------|-----------------|-----------------|--------------|------------------|
| `containerd` | CNI | 対応 | 対応 | 対応 |
| `docker` | Docker コンテナネットワークに参加 | Docker runtime の能力に依存 | 非対応 | runtime ファイルとイメージ側のコンポーネントが揃えば対応 |
| `apple` | 基盤のローカル runtime | 非対応 | 非対応 | 限定的 |
| `local` | ホストネットワーク | 非対応 | ホストレベル | コンテナデスクトップなし |

overlay provider は Bot の画面で設定し、グローバルの TOML では設定しません。それでもグローバルのバックエンドは重要です——どの種類の overlay driver を動かせるかを決めるからです。

## CDI デバイス（GPU パススルー）

ホストのデバイスを **CDI**（最も一般的なのは GPU）でコンテナ型ワークスペースに渡すには、その Bot の **Workspace** → **Advanced** で設定します。ワークスペース内で実際に CUDA/ROCm などを動かす必要があるときだけ触れば十分です。

### 設定手順

1. **Workspace** タブを開きます。コンテナがなければ先に **作成** します。
2. **Advanced** を展開して **GPU** を有効にし、**CDI devices** にデバイス名を 1 行 1 つ、またはカンマ区切りで入力します：
   - `nvidia.com/gpu=0`、`nvidia.com/gpu=all`
   - `amd.com/gpu=0`、`amd.com/gpu=all`

### ホスト側の要件

ドライバー、ベンダーツール、CDI spec がホスト上に揃っている必要があります。通常は次を意味します：

- GPU がホスト上でそもそも動いている
- `/etc/cdi` か `/var/run/cdi` に spec がある
- 入力した名前がランタイムから見える名前と一致している（NVIDIA は `nvidia-ctk cdi list`、AMD は `amd-ctk cdi list` で確認）

`unresolvable CDI devices` エラーは、ほぼ名前の不一致です。

### 注意

- CDI は**作成**時に効きます：設定を変えたら通常はコンテナの**再作成**が必要で、停止→起動だけでは接続済みデバイスは**入れ替わりません**。
- CUDA/ROCm ソフトウェアを実際に動かすには、イメージ側にも正しいユーザーランドのライブラリとツールが必要です。
- 作成後は **Workspace** タブに現在接続されているデバイスが表示されるので、確認に使えます。
- バックエンドごとの対応は上の表のとおり——CDI に対応するのは `containerd` だけです。
