# Git + GitHub 完整设置指南

## 第一步：安装 Git

### 下载Git
1. 访问：https://git-scm.com/download/win
2. 下载 Windows 版本（会自动下载）
3. 双击安装，全部默认选项即可（一路Next）

### 验证安装
安装完成后，打开命令提示符（cmd）或 PowerShell，输入：
```bash
git --version
```
如果显示版本号，说明安装成功！

---

## 第二步：配置 Git（首次使用）

打开命令行，输入以下命令（替换成你的信息）：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱@example.com"
```

---

## 第三步：创建 GitHub 账号

1. 访问：https://github.com
2. 点击 "Sign up" 注册账号
3. 验证邮箱

---

## 第四步：上传项目到 GitHub

### 1. 在 GitHub 创建新仓库
- 登录 GitHub
- 点击右上角 "+" → "New repository"
- Repository name: `resin-website`
- Description: `Timesrui Resin Product Website`
- 选择 **Public**（公开）或 **Private**（私有）
- ❌ **不要勾选** "Add a README file"
- 点击 "Create repository"

### 2. 在本地上传代码

在你的项目文件夹打开命令行（或者在文件夹地址栏输入 `cmd` 回车），然后输入：

```bash
# 1. 初始化Git仓库
git init

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "Initial commit: Timesrui resin website"

# 4. 设置主分支名称
git branch -M main

# 5. 连接到GitHub（替换成你的用户名）
git remote add origin https://github.com/你的用户名/resin-website.git

# 6. 上传
git push -u origin main
```

**注意：** 第一次push时会要求登录GitHub账号

---

## 第五步：启用 GitHub Pages（网站上线！）

1. 在 GitHub 仓库页面，点击 "Settings"
2. 左侧菜单找到 "Pages"
3. Source 选择：
   - Branch: `main`
   - Folder: `/ (root)`
4. 点击 "Save"
5. 等待1-2分钟，刷新页面
6. 会显示网站地址：`https://你的用户名.github.io/resin-website`

---

## 日常使用：同步文件

### 在家里修改后上传
```bash
cd C:\Users\apple\.easyclaw\workspace\resin-website
git add .
git commit -m "描述你做了什么修改"
git push
```

### 在公司下载项目（第一次）
```bash
git clone https://github.com/你的用户名/resin-website.git
```

### 在公司获取最新版本
```bash
cd resin-website
git pull
```

### 在公司修改后上传
```bash
git add .
git commit -m "描述修改"
git push
```

---

## 快速命令参考

| 操作 | 命令 |
|------|------|
| 查看状态 | `git status` |
| 添加所有修改 | `git add .` |
| 提交修改 | `git commit -m "说明"` |
| 上传到GitHub | `git push` |
| 下载最新版本 | `git pull` |
| 查看修改历史 | `git log` |
| 回退到上个版本 | `git reset --hard HEAD^` |

---

## 图形化工具（可选）

如果不想用命令行，可以安装：

### GitHub Desktop（推荐⭐）
- 下载：https://desktop.github.com
- 图形界面，简单易用
- 拖拽文件即可提交

### VS Code（推荐⭐⭐）
- 下载：https://code.visualstudio.com
- 内置Git功能
- 可以直接编辑代码+提交

---

## 常见问题

### Q: push时要求登录怎么办？
A: 第一次push会弹出登录窗口，输入GitHub账号密码即可

### Q: 提示 "fatal: not a git repository"
A: 确保你在正确的文件夹内，先运行 `git init`

### Q: 公司和家里文件冲突怎么办？
A: 
1. 先 `git pull` 拉取最新版本
2. 如果有冲突，Git会提示
3. 手动编辑冲突文件
4. 然后 `git add .` → `git commit` → `git push`

---

## 需要帮助？

如果在操作过程中遇到任何问题，随时告诉我：
- 错误提示内容
- 你正在执行哪一步

我会帮你解决！🦞
