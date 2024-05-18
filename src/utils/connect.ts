import Block from '../core/Block'
import isEqual from './isEqual'
import Store, { StoreEvents } from '../core/Store'
import { StateType } from '../core/types'

interface IDispatch {
  [key: string]: (dispatch: (params: AnyProps) => void, ...args: any[]) => void
}

export default function connect(mapStateToProps: (state: Partial<StateType>) => AnyProps, dispatch?: IDispatch) {
  // eslint-disable-next-line func-names
  return function (Component: new (...args: any[]) => Block): new (...args: any[]) => Block {
    return class extends Component {
      private onChangeStoreCallback: () => void

      constructor(props: AnyProps) {
        // сохраняем начальное состояние
        let state = mapStateToProps(Store.getState())

        super({ ...props, ...state })

        const dispatchHundler: IDispatch = {}
        Object.entries(dispatch || {}).forEach(([key, hundler]) => {
          dispatchHundler[key] = (...args) => hundler(Store.setState.bind(Store), ...args)
        })

        this.setProps({ ...dispatchHundler })

        this.onChangeStoreCallback = () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(Store.getState())

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState })
          }

          // не забываем сохранить новое состояние
          state = newState
        }

        // подписываемся на событие
        Store.on(StoreEvents.Updated, this.onChangeStoreCallback)
      }

      componentWillUnmount() {
        super.componentWillUnmount()
        Store.off(StoreEvents.Updated, this.onChangeStoreCallback)
      }
    }
  }
}
