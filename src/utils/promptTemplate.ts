import type { PromotionContent } from "@/types";

export function generateSchoolPrompt(schoolName: string): string {
  return `你是一位专业的学校宣传文案撰写专家。请根据学校名称"${schoolName}"，撰写一份完整的学校宣传文案。

要求：
1. 语言风格：正式、专业、富有感染力，体现教育机构的庄重与活力
2. 内容结构完整，包含以下字段：
   - slogan: 学校标语（1-2句话，简洁有力，体现学校精神）
   - description: 学校简介（300-500字，介绍学校概况、办学理念、整体实力）
   - features: 办学特色（4-6条，每条一句话，突出学校的优势和亮点）
   - history: 历史沿革（150-250字，简述学校的发展历程和重要里程碑）
   - contact: 联系方式（包含address地址、phone电话、email邮箱）

3. 如果这是一所真实存在的知名学校，请基于真实信息撰写
4. 如果学校名称比较通用或不确定，请创作合理的虚构内容，但要显得真实可信
5. 所有内容必须是中文
6. 输出严格为JSON格式，不要包含任何其他文字或markdown标记

JSON格式示例：
{
  "slogan": "博学笃行，立德树人",
  "description": "学校简介内容...",
  "features": ["特色1", "特色2", "特色3", "特色4"],
  "history": "历史沿革内容...",
  "contact": {
    "address": "学校地址",
    "phone": "联系电话",
    "email": "电子邮箱"
  }
}`;
}

export function generateMockContent(schoolName: string): PromotionContent {
  const name = schoolName || "示例学校";
  return {
    slogan: "博学笃行，追求卓越",
    description: `${name}是一所具有深厚文化底蕴和鲜明办学特色的现代化学校。学校秉承"以人为本、全面发展"的办学理念，致力于培养具有创新精神和实践能力的优秀人才。校园环境优美，教学设施先进，师资力量雄厚，为学生的成长成才提供了优越的条件。多年来，学校以优异的教学质量和丰硕的办学成果赢得了社会各界的广泛赞誉。`,
    features: [
      "雄厚的师资力量，名师荟萃，师德高尚",
      "先进的教学设施，现代化教室和实验室",
      "丰富多彩的校园文化活动，全面素质教育",
      "优良的校风学风，严谨治学氛围",
      "多元化课程体系，个性化发展空间",
      "广泛的国际交流与合作",
    ],
    history: `${name}创建于上世纪五十年代，历经七十余载的薪火相传、砥砺前行。从建校之初的艰苦创业，到改革开放后的蓬勃发展，再到新时代的跨越腾飞，学校始终与时代同频共振。一代代教育工作者秉持教育初心，潜心育人，为国家和社会培养了数以万计的优秀人才，谱写了一曲曲壮丽的教育篇章。`,
    contact: {
      address: "教育路1号",
      phone: "010-12345678",
      email: `contact@${name.replace(/\s+/g, "").toLowerCase()}.edu.cn`,
    },
  };
}

export function parseAiResponse(response: string): PromotionContent | null {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (
        parsed.slogan &&
        parsed.description &&
        Array.isArray(parsed.features) &&
        parsed.history &&
        parsed.contact
      ) {
        return parsed as PromotionContent;
      }
    }
    return null;
  } catch {
    return null;
  }
}
