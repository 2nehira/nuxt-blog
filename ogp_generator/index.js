const fs = require('fs');
const {createWriteStream} = require('fs');
const matter = require('gray-matter');
const {createCanvas} = require('canvas');
const path = require('path');
const img_width = 1200, img_height = 630;

const ogpGenerateAll = () =>{
    const content_dir = './content/posts/'
    const article_path_list = fs.readdirSync(content_dir);
    const ogp_save_dir = './static/ogp/';
    const site_name = 'My blog';
    for(const article_path of article_path_list){
        const article = fs.readFileSync(content_dir + article_path, 'utf8');
        const meta = matter(article).data;
        const title = meta.title;
        const article_path_main = path.basename(article_path, '.md');
        const save_image_path = ogp_save_dir + article_path_main + '.png';
        ogpImageGenerater(title, site_name, save_image_path);
    }
}

const setBackground = (ctx) =>{
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, img_width, img_height);
}

const setSiteName = (ctx, site_name) =>{
    ctx.fillStyle = 'black';
    ctx.font = '40px Arial';
    const text = ctx.measureText(site_name);
    ctx.fillText(site_name, (img_width-text.width)/2, 100);
}

const setTitle = (ctx, title) =>{
    const padding = 100;
    ctx.fillStyle = 'black';
    ctx.font = '80px Impact';
    const text = ctx.measureText(title);
    // 一行に収まるなら一行で描画
    if(text.width + 2 * padding <= img_width){
        const sx = (img_width - text.width) / 2;
        const sy = 300;
        ctx.fillText(title, sx, sy);
        return;
    }
    const n = title.length;
    let pre_text = '';
    let back_text = '';
    // 1行目に収まる文字数を調べる
    for(let i = n-1; i > 0; i--){
        pre_text = title.substr(0, i);
        back_text = title.substr(-(n-i));
        if(ctx.measureText(pre_text).width + 2 * padding <= img_width){
            break;
        }
    }
    const back_n = back_text.length;
    let back_text2 = '';
    let suffix = ''; // 2行目が長過ぎるときは省略記号(...)をつける(2回目のループから)
    // 2行目に収まる文字数を調べる
    for(let i = back_n; i > 0; i--){
        back_text2 = back_text.substr(0, i);
        if(ctx.measureText(back_text2 + suffix).width + 2 * padding <= img_width){
            back_text2  = back_text2 + suffix;
            break;
        }
        suffix = '...';
    }
    const sy1 = 300;
    const sy2 = 400;
    ctx.fillText(pre_text, padding, sy1);
    ctx.fillText(back_text2, padding, sy2);
}
const ogpImageGenerater = (title, site_name, save_image_path) => {
    const canvas = createCanvas(img_width, img_height);
    const ctx = canvas.getContext('2d');

    setBackground(ctx);
    setSiteName(ctx, site_name);
    setTitle(ctx, title);
    
    canvas.createPNGStream().pipe(createWriteStream(save_image_path));
}

ogpGenerateAll();