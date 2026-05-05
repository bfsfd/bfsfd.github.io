# YouTube Channel Showcase (Next.js)

مشروع بسيط لعرض فيديوهات قناتك على يوتيوب بشكل احترافي. المشروع يجلب الفيديوهات آليًا من YouTube Data API ويعرضها في شبكة، مع صفحة مفصّلة لكل فيديو.

## المميزات
- جلب فيديوهات القناة آليًا (search endpoint).
- صفحة فيديو مدمجة (iframe).
- نقطة نهاية `/api/videos` تعمل كـ proxy (تحمي مفتاح الـ API).
- اختيار قناة من القائمة أو لصق Channel ID في الواجهة.
- جاهز للنشر على Vercel أو أي مزود يدعم Next.js.

## المتطلبات
- Node.js 18+
- مفتاح YouTube Data API v3
- Channel ID الخاص بالقناة (اختياري؛ يوجد قناة افتراضية في .env.example)

## كيفية الحصول على YouTube API Key
1. افتح https://console.developers.google.com/
2. أنشئ مشروعًا جديدًا.
3. فعّل YouTube Data API v3 للمشروع.
4. أنشئ API Key من قسم "Credentials".

## إعداد المتغيرات البيئية محليًا
انسخ `.env.example` إلى `.env.local` وعلّمه بالقيم:
```
YT_API_KEY=YOUR_YOUTUBE_API_KEY
YT_CHANNEL_ID=UC8butISFwT-Wl7EV0hUK0BQ
YT_CHANNEL_TITLE=freeCodeCamp
BASE_URL=http://localhost:3000
```

## تشغيل محليًا
1. تثبيت الحزم:
```
npm install
```
2. تشغيل وضع التطوير:
```
npm run dev
```
3. افتح http://localhost:3000

> ملاحظة: عند التشغيل المحلي page getStaticProps يعتمد على BASE_URL لمعالجة fetch إلى نقطة النهاية الداخلية. إذا لم تعمل في بيئة build، يمكنك استبدال fetch في getStaticProps بالنداء المباشر لـ YouTube API (لكن سيفصح ذلك عن المفتاح أثناء البناء إن لم تكن مدركًا).

## نشر على Vercel
1. ادفع المشروع إلى GitHub.
2. اربط المستودع في Vercel.
3. أضف متغيرات البيئة في إعدادات المشروع على Vercel:
   - YT_API_KEY
   - YT_CHANNEL_ID (اختياري)
   - YT_CHANNEL_TITLE (اختياري)
4. نشر — سيعمل الموقع آليًا.

## رفع المشروع إلى GitHub بسرعة (أوامر)
```
git init
git add .
git commit -m "Initial: YouTube channel showcase"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## تحسينات مستقبلية مقترحة
- عرض إحصاءات الفيديو (views/likes) من endpoint `videos`.
- تجميع القنوات على صفحات منفصلة / عرض playlists.
- إضافة SEO tags وملفات Open Graph.
- دعم dark/light theme وتخصيص ألوان.
