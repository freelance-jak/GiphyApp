import React from "react";
import axios from "axios";
import SearchArea from "./components/SearchArea";

export default class GiphyApp extends React.Component {
  constructor() {
    super();
    this.state = { gifUrlList: [] };
  }

  render() {
    return (
      <div>
        <h2>GiphyApp</h2>
        <p>入力された文字でGIF画像を検索します</p>
        <SearchArea searchGif={this.giphyApi} />
        {this.renderImageList(this.state.gifUrlList)}
      </div>
    );
  }

  /**
   * GiphyAPIを実行し、取得した画像のURLを配列に変換しstateに設定する
   * @param target 検索文字
   * @return なし
   */
  giphyApi = target => {
    //GiphyAPIを実行するための定義
    const searchKey = target;
    const key = "IOv3YP3uQiAtC2spYVCArB4CC000M7Pg";
    const limit = 20;
    const url = `https://api.giphy.com/v1/gifs/search?q=${searchKey}&api_key=${key}&limit=${limit}`;

    //GiphyAPIを実行し、取得したGIF一覧を配列に変換する
    axios.get(url).then(res => {
      const data = res.data.data;
      const gifUrlList = data.map(item => item.images.downsized.url);
      this.setState({ gifUrlList: gifUrlList });
    });
  };

  /**
   * 画像URLの配列を受け取り、リストとしてレンダリングして返却する
   * @param list 画像URLリスト
   * @return 画像リストをレンダリングしたもの
   */
  renderImageList(list) {
    const imageList = list.map(url => {
      return (
        <li className="item">
          <img className="image" src={url} />
        </li>
      );
    });

    return <ul className="list">{imageList}</ul>;
  }
}
