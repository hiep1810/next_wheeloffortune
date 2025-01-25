This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Wheel of Fortune Game

Một ứng dụng vòng quay may mắn tương tác được xây dựng với Next.js và TypeScript.

## Tính năng

- 🎡 Vòng quay mượt mà với animation
- 🎉 Hiệu ứng confetti khi thắng giải
- ✏️ Tùy chỉnh phần thưởng dễ dàng:
  - Nhập danh sách theo từng dòng
  - Hoặc định dạng JSON với nhiều tùy chọn hơn
- 🎨 Màu sắc ngẫu nhiên cho mỗi phần thưởng
- 📊 Có thể tùy chỉnh xác suất trúng thưởng
- 🔄 Nút Reset để quay lại cấu hình mặc định

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000/play](http://localhost:3000/play) with your browser to see the wheel game.

### Cách sử dụng

1. Chọn chế độ nhập liệu (List/JSON)
2. Nhập danh sách phần thưởng:
   - Chế độ List: Mỗi phần thưởng một dòng
   - Chế độ JSON: Định dạng mảng các đối tượng với các thuộc tính:
     ```json
     {
       "id": number,
       "text": string,
       "probability": number,
       "color": string,
       "reward": {
         "type": "points" | "name" | "none",
         "value": number | string
       }
     }
     ```
3. Nhấn vào vòng quay để bắt đầu

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
