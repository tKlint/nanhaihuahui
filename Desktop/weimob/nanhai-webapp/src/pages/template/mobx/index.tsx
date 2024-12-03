import { Text, View } from '@tarojs/components';
import { Component, ComponentType } from 'react'
import './index.less';
import global from '../../../globalStore';
import { DiyComponent } from './components/diyCompont';
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation';

interface PageStateProps {
    global: {
        counter: number;
        increment: Function;
        decrement: Function;
        incrementAsync: Function;
    };
}

interface Index {
    props: PageStateProps;
}

// @observer
class Index extends Component {
    onClickCouter() {
        global.counter++;
    }

    onItemClick(id) {
        const obj = global.list.find(value => value.id === id);
        obj && (obj.text += '+');
        global.listUpdate++;
    }

    render() {
        const { counter, listUpdate } = global;
        return (
            <View className="content">
                <MMNavigation title="mobx和自定义组件" />
                <View className="container">
                    <View className="spacing" />
                    {
                        /*
                         * 先建构再赋值
                         */
                    }
                    <View onClick={this.onClickCouter}>
                        {counter}
                    </View>

                    {
                        /*
                         * 改变别的值用来做刷新
                         */
                    }
                    {global.list.map((value, index) => <View key={value.text + index} onClick={() => this.onItemClick(value.id)}>
                        <Text>item:{value.text}</Text>
                    </View>)}
                    <Text className="hide">{listUpdate}</Text>
                    <DiyComponent />
                </View>
            </View>
        );
    }
}

export default Index as ComponentType;
