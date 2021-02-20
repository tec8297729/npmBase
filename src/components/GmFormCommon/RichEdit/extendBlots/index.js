/*
 * @motto: motto
 * @Author: haichen
 * @Date: 2020-03-11 17:51:46
 * @LastEditors: haichen
 * @LastEditTime: 2020-03-11 19:35:20
 */
import Quill from 'quill';

console.log(Quill.imports);
const BlockItem = Quill.import('blots/block/embed');

export default class SiteBlot extends BlockItem {
  static create(v) {
    let node = super.create();
    node.setAttribute('url', v.url);

    return node;
  }

  static value(n) {
    return {
      url: n.getAttribute('url'),
    };
  }
}
SiteBlot.blotName = 'site';
SiteBlot.tagName = 'A';
