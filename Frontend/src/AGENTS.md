# ClinicaNC - Context for AI Agents

## 📋 Project Overview

**Project Name**: ClinicaNC  
**Type**: Healthcare Web Application  
**Organization**: No Country - Equipo 34

## 🛠️ Technical Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Package Manager**: npm

### Architecture
- **Approach**: Clean Architecture (organic, frontend-focused)
- **Reference**: [Chapter 08 - Clean Architecture Front End](https://the-amazing-gentleman-programming-book.vercel.app/es/book/Chapter08_Clean_Architecture_Front_End)

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
├── shared/           # Shared components, utilities, and domain logic
├── features/         # Feature-specific modules (business logic)
├── styles/           # Global styles and theme configuration
├── assets/           # Static assets (images, fonts, etc.)
├── mocks/            # Mock data for development and testing
└── AGENTS.md         # This file - context for AI agents
```

## 🎯 Project Goals

ClinicaNC is a healthcare web application built with modern web technologies and clean architecture principles. The project emphasizes:

- **Scalability**: Modular structure ready to grow
- **Type Safety**: Strict TypeScript configuration
- **Developer Experience**: Modern tooling and best practices
- **Clean Code**: Separation of concerns and maintainability

## 🔧 Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Path Aliases

The project uses the `@/*` alias for absolute imports from the `src/` directory:

```typescript
import { Component } from '@/shared/components/Component';
import { useFeature } from '@/features/example/hooks';
```

## 🤝 Contributing Guidelines

When working on this project:
1. Follow the established folder structure
2. Use TypeScript strict mode
3. Maintain clean architecture principles
4. Write self-documenting code
5. Keep components small and focused

---

**Last Updated**: 2025-10-16  
**Maintained by**: @davidcoachdev
