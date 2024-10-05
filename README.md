# FSD(Feature-Sliced Design) 폴더 구조 설명

이 문서는 FSD 아키텍처에 기반한 프로젝트의 폴더 구조와 각 폴더의 역할을 설명합니다.

## 목차

1. [app/](#app)
2. [pages/](#pages)
3. [widgets/](#widgets)
4. [features/](#features)
5. [entities/](#entities)
6. [shared/](#shared)

## app/

`app/` 폴더는 애플리케이션의 진입점과 전역 설정을 포함합니다.

### 구조
```
app/
├── providers/
│   ├── with-router.tsx
│   └── with-store.tsx
├── styles/
│   ├── global.css
│   └── variables.css
└── index.tsx
```

### 역할
- 애플리케이션의 초기화 및 부트스트래핑
- 전역 상태 관리 설정 (예: Redux store)
- 라우팅 설정
- 전역 스타일 및 테마 설정

### 사용 예시
```typescript
// app/index.tsx
import React from 'react';
import { withProviders } from './providers';
import { Router } from '../pages';

const App = () => <Router />;

export default withProviders(App);
```

## pages/

`pages/` 폴더는 애플리케이션의 각 페이지 또는 라우트를 정의합니다.

### 구조
```
pages/
├── main/
│   ├── ui/
│   │   └── Main.tsx
│   └── index.ts
└── profile/
    ├── ui/
    │   └── Profile.tsx
    └── index.ts
```

### 역할
- 라우트에 해당하는 페이지 컴포넌트 정의
- 페이지 레이아웃 구성
- 하위 컴포넌트 및 위젯 조합

### 사용 예시
```typescript
// pages/main/ui/Main.tsx
import React from 'react';
import { Header, Footer } from '@/widgets';
import { ProductList } from '@/features/product-list';

export const MainPage = () => (
  <>
    <Header />
    <main>
      <h1>메인 페이지</h1>
      <ProductList />
    </main>
    <Footer />
  </>
);
```

## widgets/

`widgets/` 폴더는 재사용 가능한 복잡한 UI 컴포넌트를 포함합니다.

### 구조
```
widgets/
├── header/
│   ├── ui/
│   │   └── Header.tsx
│   ├── model.ts
│   └── index.ts
└── footer/
    ├── ui/
    │   └── Footer.tsx
    └── index.ts
```

### 역할
- 여러 기능을 조합한 복잡한 UI 컴포넌트 구현
- 페이지나 다른 위젯에서 재사용 가능한 독립적인 블록 제공
- 위젯 내부의 상태 관리

### 사용 예시
```typescript
// widgets/header/ui/Header.tsx
import React from 'react';
import { Logo } from '@/shared/ui';
import { UserMenu } from '@/features/user-menu';
import { SearchBar } from '@/features/search';

export const Header = () => (
  <header>
    <Logo />
    <SearchBar />
    <UserMenu />
  </header>
);
```

## features/

`features/` 폴더는 사용자 인터랙션과 관련된 기능 단위를 포함합니다.

### 구조
```
features/
├── auth/
│   ├── ui/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── model.ts
│   ├── api.ts
│   └── index.ts
└── user-profile/
    ├── ui/
    │   └── ProfileEdit.tsx
    ├── model.ts
    ├── api.ts
    └── index.ts
```

### 역할
- 사용자 상호작용을 위한 UI 컴포넌트 구현
- 기능별 비즈니스 로직 및 상태 관리
- API 통신 로직 포함

### 사용 예시
```typescript
// features/auth/ui/LoginForm.tsx
import React from 'react';
import { useAuth } from '../model';
import { Button, Input } from '@/shared/ui';

export const LoginForm = () => {
  const { login, isLoading } = useAuth();

  return (
    <form onSubmit={login}>
      <Input name="username" placeholder="사용자명" />
      <Input name="password" type="password" placeholder="비밀번호" />
      <Button type="submit" disabled={isLoading}>로그인</Button>
    </form>
  );
};
```

## entities/

`entities/` 폴더는 비즈니스 엔티티와 관련된 로직을 포함합니다.

### 구조
```
entities/
├── user/
│   ├── ui/
│   │   └── UserCard.tsx
│   ├── model.ts
│   ├── api.ts
│   └── index.ts
└── product/
    ├── ui/
    │   └── ProductCard.tsx
    ├── model.ts
    ├── api.ts
    └── index.ts
```

### 역할
- 비즈니스 엔티티의 데이터 모델 정의
- 엔티티와 관련된 API 요청 처리
- 엔티티의 UI 표현 컴포넌트 제공

### 사용 예시
```typescript
// entities/user/model.ts
export interface User {
  id: string;
  username: string;
  email: string;
}

export const userModel = {
  getFullName: (user: User) => `${user.firstName} ${user.lastName}`,
  // 다른 사용자 관련 유틸리티 함수들...
};
```

## shared/

`shared/` 폴더는 프로젝트 전반에서 사용되는 공통 유틸리티와 UI 컴포넌트를 포함합니다.

### 구조
```
shared/
├── api/
│   └── base.ts
├── lib/
│   └── helpers.ts
├── ui/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.module.css
│   └── Input/
│       ├── Input.tsx
│       └── Input.module.css
└── config/
    └── constants.ts
```

### 역할
- 재사용 가능한 UI 컴포넌트 제공
- 공통 유틸리티 함수 및 헬퍼 제공
- 전역 상수 및 설정 관리
- 기본 API 클라이언트 설정

### 사용 예시
```typescript
// shared/ui/Button/Button.tsx
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => (
  <button className={`${styles.button} ${styles[variant]}`} {...props}>
    {children}
  </button>
);
```

이 README는 FSD 아키텍처의 각 폴더 구조와 역할을 자세히 설명하고 있습니다. 각 팀 멤버들이 이 구조를 이해하고 일관성 있게 개발할 수 있도록 도와줄 것입니다. 추가적인 설명이나 수정이 필요한 부분이 있다면 말씀해 주시기 바랍니다.
