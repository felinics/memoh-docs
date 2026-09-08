# 技能

**技能**是可复用的提示模块，用来改机器人的语气、行为方式、工具使用习惯。在机器人的 **Skills** tab 里管；可手写，也可从 [应用市场](/zh/guides/supermarket.md) 装。

---

## 长什么样

就是带 YAML 头的 `SKILL.md`，至少要有稳定的 `name` 和短 `description`。

```yaml
---
name: coder-skill
description: Enables advanced coding workflows and tool usage.
---

# Coder Skill

你写清楚代码、说明取舍，该用文件/命令工具时就用。
```

建议：

- 名字用简单 ASCII，如 `coder-skill`、`research`，别带空格；Memoh 会拿它当目录名。
- 正文就是真正要注入到运行时的说明。

---

## 从哪来

分 **托管** 和 **发现**：

- **托管**：你在 Memoh 里建、改、从应用市场装的，放在 `/data/skills/<name>/SKILL.md`。
- **发现**：容器里旧目录、导入镜像里带来的兼容路径。

Memoh 按顺序扫这些根：

| 类型 | 根路径 |
|------|--------|
| 托管 | `/data/skills/` |
| 旧版发现 | `/data/.skills/` |
| 兼容 | `/data/.agents/skills/` |
| 兼容 | `/root/.agents/skills/` |

每个根下可以直接放 `SKILL.md`，或子目录如 `/data/skills/coder-skill/SKILL.md`。

**同名**技能可能多份来源，会进入不同状态（见下）。

---

## 状态

每个来源会标：

| 状态 | 含义 |
|------|------|
| `effective` | 这个名字当前**真在用**的这一份 |
| `shadowed` | 同名有别的来源优先了 |
| `disabled` | 这一份被关掉，不用 |

记死一点：**技能名是身份**。多个 `coder-skill` 只能有一个 `effective`。

### 常见情况

- 刚在 Memoh 里建的多半是托管 + `effective`。
- 老目录里有一份时，可能先由它 `effective`，直到你装了托管同名。
- 把发现的那份 **Adopt** 成托管后，通常托管变 `effective`，旧来源变 `shadowed`。
- 关掉 `effective` 那一份，同名里下一位可能顶上来。

---

## 在界面里

### 添加

**Add Skill** → 在编辑器里写 raw Markdown → 保存，写到托管目录。

### 编辑

**Edit** 改 `SKILL.md`；自己托管的改起来最直接。

### 删除

**Delete** 会去掉这份托管目录；若还有发现来源，可能那份又变成 `effective`。

### 禁用 / 启用

**Disable** 关某一条来源不删；**Enable** 再开。适合试回退、暂时不用某套提示。

### Adopt

把**发现**来源复制进托管目录，方便你长期用界面改。已有托管同名时不能 Adopt。

---

## 运行时

只有 **effective** 会进当前机器人提示。

- `shadowed` 能看、不进提示
- `disabled` 当不存在
- 活跃会话的 **状态区** 也会显示这条路上用过哪些技能

---

## 模板自带的内置技能

Memoh 随 workspace 模板带了几个内置技能（如 `skill-creator`、`hooks-setup`），它们是**自动同步**的：workspace 每次初始化或对账时，内置副本都会刷成当前模板版本。

实际影响：

- **别原地改内置技能**——下次刷新会被覆盖。要定制就换个名字复制一份（或 Adopt 成托管技能）。
- 你自己放在旁边的技能不会被同步删掉。
- 模板带的 workspace 文件（如 `AGENTS.md`）是另一种规则：只在缺失时创建，你的修改会保留。

---

## 应用市场和导入

- **应用市场安装**：下好的技能进托管目录，和手写一样。
- **老环境/导入**：可能只出现在发现路径，需要就 **Adopt**。

---

## 建议工作流

1. 先少而精，名字和描述写清楚。
2. 不确定删不删时先 **Disable**。
3. 要长期留用的发现项用 **Adopt**。
4. 能复用就从 [应用市场](/zh/guides/supermarket.md) 装，少复制粘贴多份。
