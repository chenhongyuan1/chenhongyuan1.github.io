var e=`# 一、使用hexo+GitHub框架搭建个人博客

## 参考源
- [(99+ 封私信 / 80 条消息) GitHub+Hexo 搭建个人网站详细教程 - 知乎](https://zhuanlan.zhihu.com/p/26625249)
- [【保姆级教程】手把手教你用github制作学术个人主页（学者必备）_github学术主页-CSDN博客](https://blog.csdn.net/qd1813100174/article/details/128604858)

## 1.  什么是Hexo ?
Hexo是一款基于Node.js的静态博客框架 （库：给你轮子，你自己造车。 框架：车架子已经搭好自带轮子，你往里面填业务。二者共同目的：不用从零重复造底层基础代码。）依赖少易于安装使用，可以方便的生成[静态网页](https://zhida.zhihu.com/search?content_id=2837242&content_type=Article&match_order=1&q=%E9%9D%99%E6%80%81%E7%BD%91%E9%A1%B5&zhida_source=entity)托管在GitHub和[Heroku](https://zhida.zhihu.com/search?content_id=2837242&content_type=Article&match_order=1&q=Heroku&zhida_source=entity)上，是搭建博客的首选框架。这里我们选用的是GitHub。Hexo同时也是GitHub上的开源项目，参见：[hexojs/hexo](https://link.zhihu.com/?target=https%3A//github.com/hexojs/hexo)\xA0如果想要更加全面的了解Hexo，可以到其官网\xA0[Hexo](https://link.zhihu.com/?target=https%3A//hexo.io/)\xA0了解更多的细节，因为Hexo的创建者是台湾人，对中文的支持很友好，可以选择中文进行查看。
## 2. 
# 二、Git命令
## 1. 先在==项目文件夹下（cd / ）==打开git bash进行初始化（git init）
可以看到项目文件夹下有了.git的隐藏文件夹
## 2. 建立远程连接
Git Bash中设置user.name和user.email配置信息：
\`\`\`bash
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub注册邮箱"
\`\`\`
生成ssh密钥文件：
\`\`\`bash
ssh-keygen -t rsa -C "你的GitHub注册邮箱"
\`\`\`
这是一条**生成 SSH 密钥**的命令，作用是给你电脑创建一对“钥匙”（私钥 + 公钥），用来免密连接 GitHub，常用于\xA0\`git push\`/\`git pull\`\xA0时不用每次输密码。
- **\`ssh-keygen\`**：SSH 密钥生成工具，Windows 10+ 和 Git Bash 都自带。
- **\`-t rsa\`**：指定密钥类型为 RSA（一种加密算法）。
- **\`-C "你的GitHub注册邮箱"\`**：给密钥加一个备注标签（comment），只是个标记，方便你认出这把钥匙是谁的。把它换成你注册 GitHub 时的邮箱即可，比如\xA0\`-C "zhangsan@example.com"\`。

生成的两个文件：
- \`id_rsa\`\xA0—\xA0**私钥**，留在本机，千万别给别人
- \`id_rsa.pub\`\xA0—\xA0**公钥**，把它的内容添加到 GitHub（Settings → SSH and GPG keys → New SSH key）

这条命令是老教程里的写法，现在更推荐用更安全、更短的 Ed25519 算法：
\`\`\`bash
ssh-keygen -t ed25519 -C "你的GitHub注册邮箱"
\`\`\`
一路按回车即可。完成后公钥在\xA0\`C:\\Users\\你的用户名\\.ssh\\id_ed25519.pub\`。查看它的内容并复制：
\`\`\`bash
cat ~/.ssh/id_ed25519.pub
\`\`\`
 把公钥添加到 GitHub
\`\`\`text
 ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI...（很长一串）... zhangsan@example.com
\`\`\`
1. 登录 GitHub → 右上角头像 →\xA0**Settings**
2. 左侧\xA0**SSH and GPG keys**\xA0→\xA0**New SSH key**
3. Title 随便填（比如“我的电脑"），Key 框里粘贴刚才复制的公钥全文
4. 点\xA0**Add SSH key**

==坑：==
如果本地生成不了ssh密钥，可能是电脑中文命名的原因，路径有中文就出现的问题
改用Windows自带的ssh（在PowerShell里操作）
\`\`\`powershell
ssh-keygen -t ed25519 -C "1920991993@qq.com"
\`\`\`
测试连接
\`\`\`bash
ssh -T git@github.com
\`\`\`
## 3. 连接成功后，怎么把项目推上 GitHub
\`\`\`bash
git init                                # 初始化本地仓库
git add .                               # 添加所有文件
git commit -m "first commit"            # 提交

# 在 GitHub 网页上新建一个空仓库后，关联远程地址：
git remote add origin git@github.com:你的用户名/仓库名.git

git branch -M main
git push -u origin main                 # 推送到 GitHub
\`\`\`
此初始化同第一步如果执行过不需要再执行，之后每次改动，只需要\xA0\`git add .\`\xA0→\xA0\`git commit -m "说明"\`\xA0→\xA0\`git push\`\xA0三步。add . 全部文件也可以指定文件
## 4. 建立连接的方式不止一种
**SSH**（不是 ssk）。其实它不是“必须启用”，而是一种**连接 GitHub 的方式**，另一种是 HTTPS。
为什么推荐 SSH，主要原因有四个：

**一次配置，永久免密**
用 HTTPS 推送代码时，每次\xA0\`git push\`\xA0都要输一遍凭证。而 SSH 用的是“钥匙对”机制：私钥留在你电脑里，公钥放在 GitHub 上，连接时双方自动验证，之后每次 push/pull/clone 都不需要输任何东西。
**GitHub 已经不允许用密码推送了**
2021 年 8 月起，GitHub 取消了“账号密码 + HTTPS”的方式。如果你走 HTTPS，必须去生成一个\xA0**Personal Access Token**（一长串字符）当作密码用。而 SSH 密钥正好绕开了这个麻烦——生成一次就用，不用管理 token。
**更安全**
- 密码可能被钓鱼、被泄露，而私钥从不离开你的电脑，网络上传输的是加密的验证过程；
- 密钥可以随时在 GitHub 上**单独撤销**（删掉那把公钥即可），不用改账号密码；
- 你还能给私钥本身设一道 passphrase，等于双保险。
**对仓库地址更友好**
SSH 的远程地址长这样：\`git@github.com:用户名/仓库.git\`，clone、push 都走它，不依赖每次输入。
## 5.  git 管理的本地仓库，每次重启后怎么重新建立连接？
**Git 本地仓库信息保存在文件夹内的 \`.git\` 目录，重启电脑不会丢失配置，绝大多数情况不需要重新建立连接**。只有路径变动、SSH 密钥失效、更换账号才需要重新配置。
先确认远程仓库是否还在（进入仓库目录执行）
\`\`\`bash
# 查看已经绑定的远程地址，默认名字叫 
origin git remote -v
\`\`\`
输出类似这样，说明远程连接配置还存在，**直接 pull/push 即可，不用重建**：

\`\`\`bash
origin  https://gitee.com/xxx/demo.git (fetch)
origin  https://gitee.com/xxx/demo.git (push)
\`\`\`
### 如果提示 \`fatal: not a git repository\`

原因：你当前终端不在 git 仓库文件夹里 解决：\`cd\` 进入你的项目根目录（包含 \`.git\` 隐藏文件夹的目录）
## 6. Git 修改文件后完整推送流程（你当前在仓库 main 分支）
> 顺序：查看状态 → 添加文件 → 提交 → 推送到远程
\`\`\`bash
# 1. 查看改动，确认哪些文件被修改
git status
\`\`\`
红色的就是改动过还没暂存的文件

\`\`\`bash
# 2. 把改动加入暂存区
# 方式A：全部改动都加入（常用）
git add .

# 方式B：只添加指定文件（推荐精确控制）
git add index.html css/style.css
\`\`\`

\`\`\`bash
# 3. 本地提交，必须写提交备注，描述这次改了什么
git commit -m "这里填写本次修改说明，比如：修复首页样式bug"
\`\`\`

> 如果弹出编辑器，是没加 \`-m\`，输入内容后 \`:wq\` 保存退出

\`\`\`bash
# 4. 推送到远程 main 分支（第一次推送需要加 -u，后续直接 git push）
git push -u origin main
\`\`\`

> \`-u origin main\`：把本地 main 和远程 main 建立关联，**只需要第一次执行**，之后更新代码直接敲 \`git push\`

---

日常最简流程（改完文件后重复用）

\`\`\`
git add .
git commit -m "修改描述"
git push
\`\`\`

## ==常见坑==：
### 1. 推送报错：远程有别人新提交的代码
不能直接 push，要先拉取远程最新代码合并：
\`\`\`bash
git pull origin main
# 解决冲突（如果出现冲突），再重新 add → commit → push
\`\`\`
### 2. git commit 忘记写 -m
弹出 vim 编辑器，按 \`i\` 输入备注，按 \`Esc\`，输入 \`:wq\` 回车保存。
### 3. 想撤销暂存（git add 加错文件）
\`\`\`bash
git reset HEAD 文件名
# 撤销全部暂存
git reset HEAD .
\`\`\`
### 4. \`git add .\` 详细解释
Git 三个区域简单理解
1. **工作区**：你电脑上看到的文件，你在这里改代码（就是你 VSCode 打开的文件）
2. **暂存区 (stage/index)**：一个临时 “待提交清单”，\`git add\` 就是把改动放进这个清单
3. **本地仓库**：\`git commit\` 把暂存区里清单的内容，永久保存到本地.git 仓库
\`\`\`bash
# 1. 当前目录下全部改动（新增/修改/删除文件），最常用
git add .

# 2. 只添加修改、删除的文件，不包含新建的文件
git add -u

# 3. 只添加指定单个文件（更安全，推荐熟悉后用，不会误加无关文件）
git add index.html
\`\`\`

# 三、Hexo和自定义网页的对比
## 1. 用 Hexo 是因为快吗？

对，核心就是快，而且快在两个层面：

- **搭建快**：一条命令得到一个能跑的博客，主题、文章列表、归档、标签、RSS 全都是现成的。这些“每个博客都长一样的东西”它都替你写好了。
- **写作快**：以后发文章只需丢一个 Markdown 文件进文件夹、跑一条命令，不用碰任何页面代码。

Hexo 的本质是**静态网站生成器**：把 Markdown 编译成纯 HTML/CSS/JS，不需要服务器和数据库，所以能免费挂在 GitHub Pages 上。

## 2. React 自己写的网站能部署到 GitHub Pages 吗？

**完全可以。**\xA0GitHub Pages 只要求“静态文件”，而 React 项目（Vite 或 CRA 创建的）执行\xA0\`npm run build\`\xA0之后产出的\xA0\`dist/\`（或\xA0\`build/\`）文件夹就是一堆静态文件，直接丢上去就能跑。部署方式比 Hexo 还简单：

\`\`\`bash
npm run build# 然后把 dist 文件夹的内容推到 GitHub 仓库（可用 gh-pages 插件或 GitHub Actions 自动化）
\`\`\`

只有两个小注意点：用 react-router 做路由时，深链接刷新会 404，需要加一个\xA0\`404.html\`\xA0转跳的小技巧；Vite 项目要配一下\xA0\`base\`\xA0路径。这些到时候都能解决。

## 3. Hexo 有局限性吗？

有，而且正好是和 React 相反的方向：

- **形态固定**：它是“博客形状”的，适合文章流。你想做交互复杂的个人主页（动画、自定义组件、作品展示区之类），就得在主题里硬塞 JS，越改越别扭。
- **定制有天花板**：改主题的样式、布局还行；想大改结构就要读懂主题的 EJS 模板体系，学习成本不比学一个新框架低。
- **技术栈偏老**：模板引擎和主题生态都是上一代的东西，对练 React 没有帮助。

**还有一类中间方案值得你知道**：Next.js 或 Astro 这类框架——用\xA0**React 组件写布局**（完全自由），用\xA0**Markdown 写文章**（保留 Hexo 的写作体验），最终同样生成静态文件部署到 GitHub Pages。如果你的目标是“个人主页 + 博客”并且想练 React，这其实是比 Hexo 更适合你的路线。

## 怎么选

- 想**今天就上线**一个像样的博客，专注写内容 → Hexo，继续走当前流程。
- 想**自己设计页面**、把网站当成 React 练手项目 → 不用 Hexo，直接 React/Vite 或 Next.js 写完 build 部署，我可以带你走一遍。==同时react具有全球最大生态，就是已经有许多现成的轮子了。==
# 四、在网站上直接写博客（在线编辑、在线发布）
静态站点自己存不了数据，但\xA0**GitHub 本身就是你的数据库**。标准玩法是“网页编辑器 + GitHub API + 自动构建”：

1. 你的网站里做一个后台编辑页（或者用现成的开源 CMS，如\xA0**Decap CMS**，免费）；
2. 你在网页上写文章、点发布 → 页面调用 GitHub API，把这篇 Markdown\xA0**提交到你的仓库**；
3. 仓库有新提交 →\xA0**GitHub Actions 自动执行构建**\xA0→ 新的静态文件推给 GitHub Pages → 网站更新。

整个过程你不用打开本地编辑器，手机上也能发文。这就是很多静态博客“在线写作”的真实原理——表面是动态网站，实际是“静态前端 + GitHub 当后台”。

当然，最朴素的方式永远是：本地写好 Markdown 推上去，效果一样，只是没有网页编辑器。
# 五、博客实现其他用户留言评论 + 登录授权
这是静态博客的经典需求，现成轮子很多，都是**嵌入一个组件**的事：

|方案|授权方式|数据存在哪|需要自己搭后端吗|
|---|---|---|---|
|**giscus**|GitHub 登录|你仓库的 Discussions 区|不用，全免费|
|**Waline**|GitHub/QQ/微信等|LeanCloud（免费额度）|不用，一键部署到 Vercel|
|Disqus|自家账号|Disqus 云端|不用|

以\xA0**giscus**\xA0为例：访客点评论框 → GitHub OAuth 授权 → 评论自动存进你仓库的 Discussions。在 React 里就是引入一个\xA0\`<Giscus />\`\xA0组件，十行代码。国内访客体验更友好的是 Waline，支持 QQ/微信登录。
# 六、域名解析教程
**域名（比如 \`shturl.cc/vS\`）只是方便人记的名字；电脑上网只能识别 IP 地址。域名解析，就是一张「域名 → IP 地址」的对照表，把你输入的域名翻译成服务器 IP，才能找到网站。**

## 打个比方

> 域名 = 人名：张三 IP 地址 = 身份证号：110xxxx DNS 解析 = 通讯录

你没法靠人名直接找到人，要查通讯录拿到身份证号；浏览器没法直接访问 \`shturl.cc/vS\`，要去 DNS 服务器查表，拿到对应的 IP 地址，再去连接这个 IP 上的 GitHub Pages 服务器。

## 放到你 GitHub Pages + 阿里云域名这个场景

- 你的 GitHub 博客真实服务器 IP：\`185.199.108.153\` 等那 4 个 IP
- 你买的域名：\`shturl.\`
- **解析操作 = 在阿里云 DNS 通讯录里写一条记录：shturl. → GitHub Pages 的 IP**

当别人浏览器输入 \`shturl.\`：

1. 浏览器问 DNS 服务器：\`shturl.\` 的 IP 是多少？
2. DNS 查到你在阿里云设置的解析记录，返回 GitHub Pages 的 IP
3. 浏览器拿着 IP，去访问 GitHub 服务器，把博客页面返回给访客

## 那 CNAME 记录是什么？

CNAME 不是直接指向 IP，而是**域名指向另一个域名**。 比如 \`www.shturl.\` CNAME 指向 \`aiguozhepromax.github.io\` 意思：\`www.shturl.\` 的地址，和 \`aiguozhepromax.github.io\` 是同一个地址，去查它的 IP 就行。

> 好处：GitHub 如果以后换服务器 IP，你不用手动改阿里云解析，CNAME 会自动跟随。 限制：裸域名 \`shturl.\`（主机记录 @）**不能用 CNAME**，只能用 A 记录填 IP。

## 为什么必须在阿里云后台设置解析？

域名是阿里云卖给你的，**这个域名默认的 DNS 服务器是阿里云的 DNS**。 你不去阿里云后台添加解析记录，通讯录里就没有这条映射关系。别人访问你的域名，DNS 查不到记录，直接报错：无法访问 / 域名不存在。

## 补充两个关键点

1. **解析只是【地址翻译】，不等于网站上线** 解析成功，只是域名能找到 GitHub 服务器；GitHub 那边还要配置 Custom domain，告诉 GitHub：有人访问这个域名时，要返回你的博客仓库页面。两件事缺一不可。
2. 国内域名额外：**解析 ≠ 备案** 就算解析配好了，域名没有 ICP 备案，国内运营商会拦截访问，国内用户打不开，国外可以正常访问。

## 极简总结

✅ 域名：人好记 
✅ IP：机器能识别 
✅ DNS 解析：域名翻译成 IP 的映射表，没有解析，浏览器根本不知道这个域名对应哪台服务器。

阿里域名解析：
[阿里云如何解析域名(图文)_阿里云域名解析详细教程-CSDN博客](https://blog.csdn.net/jsbbhx/article/details/135852645)
[Github Pages 绑定阿里云域名_github 域名 阿里云-CSDN博客](https://blog.csdn.net/Bennnnnnn/article/details/130403197)
# 七、[【2026最新实测】DigitalPlat 免费域名申请全流程 + Cloudflare 托管教程（保姆级图文）-CSDN博客](https://blog.csdn.net/2504_94775171/article/details/160453720)
# 八、`;export{e as default};