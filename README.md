# 学校宣传网页自定义工具

一个帮助学校快速生成精美宣传网页的工具。用户只需上传校徽、横版/竖版学校图片并填写学校名称，系统即可自动生成宣传文案并导出完整的HTML宣传网页。

## 功能特性

- 🎨 **精美设计模板**：专业设计师打造的学院风模板，庄重典雅又不失现代感
- 🤖 **AI智能生成**：输入学校名称，AI自动生成专业宣传文案
- 🖼️ **图片自由上传**：支持上传校徽、横版和竖版学校图片
- ⚡ **一键生成**：简单三步操作，几分钟内生成完整宣传网页
- 📄 **导出HTML**：一键下载完整HTML文件，单文件可直接部署使用

## 技术栈

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 3
- Zustand（状态管理）
- Lucide React（图标库）

## 快速开始

### 前置条件

确保您的环境已安装：
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
cd school-website-generator
pnpm install
```

### 开发模式

```bash
pnpm run dev
```

启动后访问 http://localhost:5173/

### 构建生产版本

```bash
pnpm run build
```

构建产物输出到 `dist/` 目录

### 预览生产版本

```bash
pnpm run preview
```

## 使用说明

1. **浏览Demo**：页面顶部展示学校宣传网页示例，了解最终效果
2. **上传素材**：滚动到页面底部的上传区域
3. **填写信息**：
   - 输入学校名称
   - 上传校徽（正方形）
   - 上传横版学校图片（16:9，用于banner）
   - 上传竖版学校图片（3:4，用于内容展示）
4. **生成网页**：点击「一键生成宣传网页」按钮
5. **预览下载**：在弹窗中预览效果，点击「下载HTML」保存文件

## 项目结构

```
src/
├── components/          # React组件
│   ├── DemoSection.tsx     # Demo展示区
│   ├── FeaturesSection.tsx # 功能介绍区
│   ├── ImageUpload.tsx     # 图片上传组件
│   ├── UploadForm.tsx      # 上传表单区
│   └── PreviewModal.tsx    # 预览弹窗
├── pages/               # 页面
│   └── Home.tsx            # 首页
├── store/               # 状态管理
│   └── useSchoolStore.ts   # Zustand store
├── utils/               # 工具函数
│   ├── promptTemplate.ts   # AI提示词模板
│   ├── htmlGenerator.ts    # HTML生成器
│   └── imageUtils.ts       # 图片处理工具
├── types/               # TypeScript类型定义
│   └── index.ts
├── App.tsx              # 应用入口
├── main.tsx             # React入口
└── index.css            # 全局样式
```

## 生成的宣传网页包含

- 固定导航栏（带校徽和学校名称）
- Hero大banner区域（带学校标语）
- 学校简介板块
- 办学特色（6个特色卡片）
- 历史沿革
- 页脚（含联系方式）
- 响应式设计，适配移动端

## AI提示词

项目包含完整的AI提示词模板，可直接接入真实AI API。提示词模板位于 `src/utils/promptTemplate.ts`，包含：
- 学校标语
- 学校简介
- 办学特色
- 历史沿革
- 联系方式

## 许可证

MIT
