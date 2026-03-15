/**
 * 用 Word 提取的原文生成 annualReviewsData.js
 * - 正文原封不动
 * - 摘要取前 150-200 字（尽量在句号处截断）
 */
const fs = require('fs');
const path = require('path');

const EXTRACTED = path.join(__dirname, 'extracted');
const OUT = path.join(__dirname, '..', 'src', 'data', 'annualReviewsData.js');

function getExcerpt(text, maxLen = 200) {
  const t = text.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
  if (t.length <= maxLen) return t;
  let s = t.slice(0, maxLen);
  const last = Math.max(
    s.lastIndexOf('。'),
    s.lastIndexOf('！'),
    s.lastIndexOf('？'),
    s.lastIndexOf('…')
  );
  if (last > 150) s = s.slice(0, last + 1);
  else if (last > 80) s = s.slice(0, last + 1);
  return s;
}

function escapeForTemplateLiteral(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const ORDER = [
  { id: '2025', year: 2025, title: '2025年读书盘点', file: '2025.txt' },
  { id: '2024', year: 2024, title: '2024年读书盘点', file: null },
  { id: '2023', year: 2023, title: '2023年读书盘点', file: '2023.txt' },
  { id: '2022_1', year: 2022, title: '2022读书盘点（上）', file: '2022_1.txt' },
  { id: '2022_2', year: 2022, title: '2022读书盘点（下）', file: '2022_2.txt' },
  { id: '2021_1', year: 2021, title: '2021个人读书盘点（上）', file: '2021_1.txt' },
  { id: '2021_2', year: 2021, title: '2021个人读书盘点（下）', file: '2021_2.txt' },
];

// 2024 保留现有长内容，这里只设摘要
const YEAR_2024_CONTENT = `2024年度读书盘点，说实话没写完……所以公众号上也没有发布。但是好歹写了部分，放上，凑个数。

《我眼中的世界》【美·李飞飞】
 这是2024年的畅销书，我今年看的AI系列书籍之一。作者李飞飞被誉为AI教母，美国工程院、医学院、艺术与科学院三院院士，前谷歌云人工智能及机器学习首席科学家。这是一个提到人工智能绕不过的名字。
 不过这本书更多的是写她的人生经历和AI研究，从中可以一窥早期AI发展史。书本身非常好看，今年有两本把我看哭的书，这是其中一本。
 把我看哭的是前半部分，讲她作为第一代移民的经历，原生家庭，在国内的学习生活，初到美国克服种种困难，最后全奖进入普林斯顿。印象深刻的有她毕业做人生选择之时母亲的角色。当时美国经济蒸蒸日上，数学系毕业的李飞飞只要愿意，轻松入职麦肯锡拿百万年薪。家里需要钱，父母为了她已经付出太多，但是她知道自己的兴趣与志向所在。她犹豫了，然而当她去问母亲时，正在洗衣房工作的母亲回应得斩钉截铁："我们一家人费这么大劲来美国，是让你找到人生的方向，而不是为了让你挣大钱。"
 这是现代版的"孟母三迁"。这种迁移现在太多，为了孩子的教育做出移民决定。李飞飞是幸运的，有非常和谐的原生家庭，抓住那个年代的机遇，而她的学术生涯可以说也"踩对了点"。
 之前看科学历史的书时，深感学术研究的成功很大程度上也是运气使然。所有成功都类似，不能忽视客观作用，但同样，不能忽视主观的努力。尤其对学术来讲，坚持自己的研究路线，固执已见不是都能成功，但成功的科学家绝对需要对自己的研究充满信心，不惜代价甚至顽固地坚持下来，李飞飞做到了。
 如今，李飞飞已经创业。如她所说，AI发展的中心已经从高校转移到产业界。没有任何一所高校有硅谷巨头那样的资源财力让研究走在世界前列。2025年，AI继续狂飙，更深入地走进我们日常工作生活，而且已经可以遇见，AI改变世界的狂风骤雨即将真正到来。很幸运又将亲历一次技术狂潮与科技革命。
 另外，最近看到一篇文章提到李飞飞的身份认同。和二代不同，李飞飞在国内念书直到高中。文章里写到主持人问李飞飞，你是中国人还是美国人，她毫不犹豫地回答说中国人，并补充说我深深爱着我的祖国，如果以后有机会获得诺贝尔奖，希望是以中国人的身份领奖。坦白讲这着实让我惊掉下巴，不是不愿意看到她对中国如此强烈的认同感，但她是美国籍，并且她之所以能取得如此成就，和美国的教育与环境是分不开的。如果当初父母没有移民，她不会成为"AI教母"。
 有意思的是，如今华人几乎主导着硅谷AI圈。AI既是超越国界的科技变革，也是大国竞争的前沿。不光个体的身份认同——写盘点期间Meta收购Manus，成为25年末最后一个AI大事件，过不多久，商务部启动交易审查。企业当然也是有身份认同的，不管企业家自己是不是认同，搞不好就成去年初港口事件。

 《克拉拉与太阳》【英|石黑一雄】
 这篇已写单独文章。请戳

 《被掩埋的巨人》
 【英|石黑一雄】
 看完书，我在豆瓣点击看过、推荐，并附上一句话："回忆是被掩埋的巨人，终将爆发出惊人的力量。"
 回忆是石黑一雄很多作品的主题。另一本《远山淡影》写回忆的错乱，也不错。但是要说值得上诺贝尔文学奖级别的作品，那还得这本《被掩埋的巨人》。
 "好心的夫人啊，你这么确定不要这迷雾吗？有些事情藏起来，不放在心里，难道不是更好吗？""迷雾笼罩着所有的记忆啊，好的坏的都包括。不是吗？""这么说，夫人，你不怕坏的记忆？"
 "先生，一旦这呼吸停止，这片土地上沉睡多年的东西将被唤醒！是啊，我们屠杀了很多人，这我承认。""我的神为我们那天的行为感到不安。但事情过去很久了，死者安息于地下，地上早已覆盖怡人的青草。年轻一代对他们一无所知。""那么长时间就足以让旧伤口永远愈合，让永久的和平降临在我们中间。你看她多么希望活下去，先生！发发慈悲，离开这个地方吧。让这个国家在遗忘中平复。"
 然而，人是否真的愿意遗忘？当记忆被唤醒，我们能做到不懊悔，不怪罪，宛如什么都没有发生？当某个历史被刻入一个民族的集体记忆，我们能轻描淡写一句都过去了就将它从现实中剔除？
 书的结尾，埃克索没有上岛。迷雾已经消散，妻子的记忆恢复，他没有勇气踏上这个注定孤独的岛了。但是回过头来说，记忆真的有那么重要吗？如果它阻碍此刻的幸福，是否就不应该被记起？
 不过现实告诉我，伤害和裂痕一旦产生，要修复谈何容易。`;

let out = '// 年度盘点原文（来自 Word 提取，原封不动）\n// 首页摘要为每篇开头 150-200 字\n\nexport const reviews = [\n';

for (const item of ORDER) {
  let content;
  if (item.file) {
    const raw = fs.readFileSync(path.join(EXTRACTED, item.file), 'utf8');
    content = raw.trim();
  } else {
    content = YEAR_2024_CONTENT;
  }
  const excerpt = getExcerpt(content, 200);
  const excerptEsc = excerpt.replace(/'/g, "\\'");
  const contentEsc = escapeForTemplateLiteral(content);
  out += `{ id: '${item.id}', year: ${item.year}, title: '${item.title.replace(/'/g, "\\'")}', excerpt: '${excerptEsc}', content: \`${contentEsc}\` },\n`;
}

out += '];\n';
fs.writeFileSync(OUT, out, 'utf8');
console.log('Written', OUT);
console.log('Excerpt length sample (2025):', getExcerpt(fs.readFileSync(path.join(EXTRACTED, '2025.txt'), 'utf8'), 200).length);
console.log('Excerpt length sample (2024):', getExcerpt(YEAR_2024_CONTENT, 200).length);
console.log('2024 仍为 .pages 无法提取，沿用现有内容。');
console.log('首页将显示每篇开头约 150-200 字。');
