# Nextjs App 

Authjs + Zustand + TanStackQuery

```bash
npm i
npm run dev
```

## 환경변수

프로젝트 `.env.local` 파일에 환경변수를 지정해야 합니다.

```bash
npx auth secret
    ✔ Overwrite existing `AUTH_SECRET`? … yes
```

__.env.local__

```bash
# Google 로그인
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

# ID/PW 로그인
HEROPY_API_URL="https://asia-northeast3-heropy-api.cloudfunctions.net/api"
HEROPY_API_KEY=""
HEROPY_API_USERNAME=""

AUTH_SECRET="" # Added by `npx auth`. Read more: https://cli.authjs.dev
```
