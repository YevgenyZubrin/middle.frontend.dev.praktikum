import Block from '../core/Block'
import store, { StoreEvents } from '../core/Store'
import isEqual from './isEqual'

export default function connect(mapStateToProps: (state: AnyProps) => AnyProps) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: AnyProps) {
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState())

        super({ ...props, ...state })

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState())

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState })
          }

          // не забываем сохранить новое состояние
          state = newState
        })
      }
    }
  }
}
