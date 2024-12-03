import { View, Button } from '@tarojs/components';
import { Component, ComponentType } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import * as styles from './index.module.less';
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation';

@autobind
class Index extends Component {
    state = {

    };

    componentDidMount() {
        // eslint-disable-next-line no-console
        console.log('this.$router', getCurrentInstance().router?.params);
    }

    async onLogin() {
        const data = await Taro.login();

        // eslint-disable-next-line no-console
        console.log(data);
        const { userInfo } = await Taro.getUserInfo();
        // eslint-disable-next-line no-console
        console.log(userInfo);
    }

    render() {
        return (<View className={styles.page}>
            <MMNavigation title="登录" />
            <Button onClick={this.onLogin}>获取微信授权</Button>
        </View>);
    }
}

export default Index as ComponentType;
