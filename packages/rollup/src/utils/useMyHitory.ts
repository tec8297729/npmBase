import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

interface RouteData {
  pathname: string;
  query?: any;
  search?: Object;
  state?: any;
}

function stringifyQuery(data: Object | undefined) {
  return data ? queryString.stringify(data) : data;
}

type routerOpts = string | RouteData;

/**
 * 路由跳转方法（hook版）
 *
 * import useMyHitory from '../utils/useMyHitory';
 * function Login(props) {
 *   const [myHistory] = useMyHitory();
 *   myHistory.push({
 *    pathname: '/index',
 *    // search: { name: 'sunny', age: 35 },
 *  });
 * }
 */
function useMyHitory() {
  const history = useHistory();

  const myHistory = {
    /**
     * push跳转路由（参数同原生一样）
     *
     * search参数自动挂载到url上（提供二种传递方式，1对象，2字符串），
     *
     * myHistory.push({
     *  pathname: '/index',
     *  search: { name: 'sunny', age: 35 },
     * });
     */
    push(path: string | RouteData): void {
      let options: any;
      if (path instanceof Object) {
        options = { ...path };
        if (typeof path.search === 'string') {
          options.search = path.search;
        } else {
          options.search = stringifyQuery(path.search);
        }
        history.push(options);
        return;
      }
      // string 类型跳转
      history.push(path);
    },

    /**
     * replace替换当前页面路由
     */
    replace(path: routerOpts): void {
      let options: any;
      if (path instanceof Object) {
        options = { ...path };
        if (typeof path.search === 'string') {
          options.search = path.search;
        } else {
          options.search = stringifyQuery(path.search);
        }
      }
      history.replace(options || path); // string 类型跳转
    },

    /**
     * go指定路由前进或回退，自定义跳转几页。这是goBack和goForward的集合方法
     */
    go(count: number): void {
      history.go(count);
    },

    /**
     * 回退路由到上一页，索引-1
     */
    goBack(): void {
      history.goBack();
    },

    /**
     * 前面路由，索引+1，
     */
    goForward(): void {
      history.goForward();
    },
  };

  return [myHistory];
}
export default useMyHitory;
