import { View } from '@tarojs/components';
import { Component, ComponentType } from 'react'
import { autobind } from '~/modules/@wmeimob/decorator/src/components';

@autobind
class Index extends Component {
    state = {
        value: '',
        starsValue: 0,
        imagesValue: []
    };

    render() {
        return <View />
    }

    // private onStarsChange(starsValue) {
    //     this.setState({
    //         starsValue
    //     })
    // }

    // private onClick() {
    //     return new Promise(() => null);
    // }

    // private onInput(event: BaseEventOrig<{ value: string; cursor: number; keyCode: number; }>) {
    //     this.setState({
    //         value: event.detail.value
    //     })
    // };
}

export default Index as ComponentType;

