import { View } from '@tarojs/components';
import { Component, ComponentType } from 'react'
import Taro from '@tarojs/taro';
import { autobind, debounce, lock, throttle } from '~/modules/@wmeimob/decorator/src/components';
import MMButton from '~/modules/@wmeimob/taro-design/src/components/button';
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation';
import './index.less';

@autobind
class Index extends Component {
    state = {
        number: 0
    };

    componentDidMount() {
        // eslint-disable-next-line no-console
    }

    render() {
        return (
            <View>
                <MMNavigation title="装饰器" />

                <View className="container">
                    <View className="spacing" />
                    <View>
                        统计:{this.state.number}
                    </View>
                    <View className="spacing" />
                    <MMButton onClick={this.onLockClick}>lock按钮,函数没运行结束不会再触发</MMButton>
                    <View className="spacing" />
                    <MMButton onClick={this.onThrottleClick}>throttle按钮,一秒只能点击一次</MMButton>
                    <View className="spacing" />
                    <MMButton onClick={this.onDebounceClick}>debounce按钮,一秒2次以上触发最后一次</MMButton>
                </View>
            </View>
        );
    }

    @lock()
    onLockClick() {
        this.setState({ number: this.state.number + 1 });
        return new Promise(reslove => {
            setTimeout(() => {
                reslove(null);
            }, 2000);
        });
    }

    @throttle(1000)
    onThrottleClick() {
        this.setState({ number: this.state.number + 1 });
    }

    @debounce(1000)
    onDebounceClick() {
        this.setState({ number: this.state.number + 1 });
    }
}

export default Index as ComponentType;
