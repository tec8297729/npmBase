// export const QINIU_IMG_HOST = `https://img.kaikeba.com/`; // 七牛图片前缀

interface IQiniuOpts {
  imgHost: string;
  prefix: string;
}
class GlobalData {
  qiniuOpts: IQiniuOpts = {
    imgHost: "https://img.kaikeba.com/", // 七牛图片前缀
    prefix: "kkb/", // 上传二级目录名
  };

  setQiniuOpts(data: IQiniuOpts) {
    this.qiniuOpts = {
      ...this.qiniuOpts,
      ...data,
    };
  }
}

const globalData = new GlobalData();

export { globalData };
