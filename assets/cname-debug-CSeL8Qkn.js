var e=`# 为什么结构很重要？
大多数 Claude Code 用户知道 .claude/ 文件夹的存在，但很少有人认真思考它的组织方式。项目小的时候，一个 CLAUDE.md、几个设置文件就够了。但随着项目增长，指令变得难以维护，工作流散落在错误的地方，文件夹慢慢变成有用配置和难以解释的混乱的混合物。
一个组织良好的 .claude/ 文件夹让 Claude 更容易被引导、被信任，也更容易在真实项目中扩展。
# 目标结构蓝图
\`\`\`markdown
标记化
your-project/
├── CLAUDE.md              # 主项目指令
├── CLAUDE.local.md         # 个人覆盖（不提交）
└── .claude/
    ├── settings.json        # 控制层
    ├── settings.local.json  # 本地覆盖
    ├── rules/               # 模块化指令
    ├── hooks/               # 自动化脚本
    ├── commands/            # 可复用提示词工作流
    ├── skills/              # 打包能力
    └── agents/              # 专用子代理
\`\`\`
# 核心原则
## 1. 顶层要轻
CLAUDE.md：解释项目如何工作（栈、架构、关键命令、全局约定）
.claude/settings.json：控制 Claude 在项目中的操作方式（权限、hooks、项目级行为）
CLAUDE.local.md / .claude/settings.local.json：个人覆盖，不进git版本控制
这两层分开：一个负责引导，一个负责控制。

## 2. CLAUDE.md 与 rules/ 的划分
CLAUDE.md 放全局指导——每次会话都需要的内容：
主要技术栈
高层架构
最重要的开发命令
广泛适用的代码约定
项目级警告或约束
rules/ 放专项指导——某个领域或工作流的规则：
\`\`\`markdown
标记化
.claude/
└── rules/
    ├── frontend.md
    ├── backend-api.md
    ├── testing.md
    └── data-pipelines.md
\`\`\`
什么时候应该拆分成 rules/：
CLAUDE.md 开始显得拥挤
不同仓库区域需要不同指导
不同人有不同标准
团队经常更新约定
想按路径限定指令作用域
CLAUDE.md 建议参考这篇文章进行调整

https://x.com/vincemask/status/2052368318825402507?s=20

## 3. hooks/ 和 commands/ 分工
hooks/：自动运行的脚本，不放在说明文档中
拦截危险操作（如 block-dangerous-commands.sh）
清理或验证输出（如 format-edits.sh）
强制执行工作流要求（如 run-tests-before-stop.sh）
commands/：可复用的提示词工作流，不是自动运行的
审查 PR（review-pr.md）
编写测试（write-tests.md）
为发布准备变更摘要（summarize-changes.md）
\`\`\`markdown
标记化
.claude/
├── hooks/
│   ├── block-dangerous-commands.sh
│   ├── format-edits.sh
│   └── run-tests-before-stop.sh
└── commands/
    ├── review-pr.md
    ├── write-tests.md
    └── summarize-changes.md
\`\`\`
命名要清晰：format-edits.sh 好过 script1.sh。

## 4. skills/ 和 agents/ 的进阶结构
skills/：打包的能力，工作流有多个步骤、需要配套文档时使用
\`\`\`markdown
标记化
.claude/
└── skills/
    ├── release-prep/
    │   ├── SKILL.md
    │   └── release-template.md
    └── docs-audit/
        ├── SKILL.md
        └── style-guide.md
\`\`\`
commands/ vs skills/ 的区别：
命令/ vs 技能/ 区别：
commands/ = 轻量可复用任务（一个文件就够了）
skills/ = 更丰富的打包工作流（多个步骤 + 配套文档）
agents/：专用子代理，需要更聚焦的角色时使用
markdown
标记化
.claude/
└── agents/
    ├── code-reviewer.md
    ├── security-auditor.md
    └── docs-writer.md
每个 skill 解决一个重复出现的完整工作流，每个 agent 拥有一个专门角色。如果两个文件高度重叠，应该合并或简化。

## 5. 团队结构 vs 个人结构的分离
\`\`\`markdown
标记化
# 项目级（团队共享）
your-project/
├── CLAUDE.md
└── .claude/
    ├── settings.json
    ├── rules/
    └── hooks/

# 用户级（个人偏好）
~/.claude/
├── CLAUDE.md
├── settings.json
├── skills/
├── agents/
└── projects/
\`\`\`
判断标准：如果配置帮助整个团队更一致地工作 → 放项目级。如果主要反映一个人的工作流 → 放本地或全局设置。
本地覆盖文件：CLAUDE.local.md 和 .claude/settings.local.json 是很好的中间层，让人可以在不污染版本控制的情况下调整行为。

渐进式成长路径
不要一开始就填满所有文件夹。按需增加：
起步：CLAUDE.md + .claude/settings.json
指令膨胀：加 rules/
需要自动化：加 hooks/
提示词重复：加 commands/
工作流变深：加 skills/
需要专精角色：加 agents/

# 常见错误

|错误|正确做法|
|---|---|
|CLAUDE.md 塞太多内容 | 专项指导移入 rules/|
|提前创建不需要的文件夹|等工作流确实需要时再加|
|个人偏好混入团队文件|用 CLAUDE.local.md 或 ~/.claude/|
|文件名模糊（script1.sh）|命名要让用途一目了然|
|废弃文件不清理|定期清理 commands/、skills/、agents/ 中的死文件|
|把所有指令同等对待|区分全局指令、模块化规则、自动化脚本、可复用工作流|

#📝📝📝 关键要点

最高效的 .claude/ 文件夹不是功能最丰富的，而是每个部分都有清晰用途的。

好的结构应该能立即回答这些问题：

项目级指令在哪里？

模块化规则放哪里？

自动化脚本放哪里？

可复用工作流放哪里？

哪些是共享的，哪些是私人的？

哪些是活跃的，哪些只是实验？

当 .claude/ 组织好了，Claude 用起来会可预测、可维护、易于团队共享。`;export{e as default};