import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../setting/auth-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  authCodeFlowConfig = authCodeFlowConfig;
  promiseLoginResult: Promise<boolean>;
  isOIDCLogginned = false;

  constructor(private oauthService : OAuthService){
    // 初期化
    this.oauthService.configure(authCodeFlowConfig);
    this.promiseLoginResult = this.oauthService.loadDiscoveryDocumentAndLogin({ });
  }

  async ngOnInit(){
    // pipe ではなくて、ここで待ち合わせる形にする
    this.isOIDCLogginned = await this.promiseLoginResult;
    if(this.isOIDCLogginned){
      console.log(this.oauthService.getIdentityClaims());
    }
  }

  login() {
    // ここにログインロジックを追加
    if (this.username === 'user' && this.password === 'password') {
      alert('ログイン成功！');

    } else {
      alert('ログイン失敗。IDとPasswordを確認してください。');
    }
  }
}


