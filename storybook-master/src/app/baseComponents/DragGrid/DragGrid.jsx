import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'antd';
import shortid from 'shortid';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';

const style = require('./DragGrid.less');

const list = [
  {
    name: '1',
    id: shortid.generate(),
  }, {
    name: '2',
    id: shortid.generate(),
  }, {
    name: '3',
    id: shortid.generate(),
  }, {
    name: '4',
    id: shortid.generate(),
  }, {
    name: '5',
    id: shortid.generate(),
  }, {
    name: '6',
    id: shortid.generate(),
  },
];
export default class ShuttleLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSort: false,
    };
  }
  componentDidMount() {
    this.setState({
      showSort: true,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.addLeftItem) {
      this.setState({
        addLeftItem: nextProps.addLeftItem,
      });
    }
  }
  render() {
    const { styles } = this.props;
    return (
      <div className={styles} ref="ShuttleLeft">
        {
          <ListWrapper
            getContainer={'ShuttleLeft'}
            component={SortableList}
            helperClass={style.stylizedHelper}
            axis={'xy'}
            className={classNames(style.list, style.stylizedList, style.grid)}
            itemClass={classNames(style.stylizedItem, style.gridItem)}
            list={list}
            addLeftItem={this.state.addLeftItem}
            deleteAciton={() => {}}
            onChange={() => {}}
          />
          }
      </div>
    );
  }
}

// 拖动开始

const SortableList = SortableContainer(({
  className,
  items,
  itemClass,
  shouldUseDragHandle,
  onRemove,
}) => (
  <div className={className}>
    {items.map((data, index) => (
      <Item
        key={`item-${data.id}`}
        className={itemClass}
        index={index}
        //   value={value}
        height={[65, 110, 140, 65, 90, 65]}
        style={{ zIndex: '10000' }}
        shouldUseDragHandle={shouldUseDragHandle}
        item={data}
        onRemove={onRemove}
      />
      ))}
  </div>
  ), { withRef: true });

const Item = SortableElement(props => (
  <div
    className={props.className}
    style={{
      height: props.height,
      ...props.style,
    }}
  >
    <div className={style.ListBox} >
      <LeftListBlock {...props.item} />
    </div>
    <Button className={style.deleteBtn} onClick={() => props.onRemove(props.item)}>
      <i className={`${style.deleteIcon} creamsicon`}>&#xe63d;</i>
      {/* 删除 */}
    </Button>
  </div>
));

class ListWrapper extends React.Component {
  constructor({ list }) {
    super();
    this.state = {
      items: list,
      isSorting: false,
    };
  }
  static propTypes = {
    items: PropTypes.array,
    className: PropTypes.string,
    itemClass: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    onSortStart: PropTypes.func,
    onSortEnd: PropTypes.func,
    component: PropTypes.func,
    shouldUseDragHandle: PropTypes.bool,
  };
  static defaultProps = {
    className: classNames(style.list, style.stylizedList),
    itemClass: classNames(style.item, style.stylizedItem),
    width: 400,
    height: 600,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.list && this.props.list !== nextProps.list) {
      this.setState({
        items: nextProps.list,
      });
    }
  }
  onSortStart = () => {
    const { onSortStart } = this.props;
    this.setState({ isSorting: true });

    if (onSortStart) {
      onSortStart(this.refs.component);
    }
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { onSortEnd } = this.props;
    const { items } = this.state;
    this.setState({ items: arrayMove(items, oldIndex, newIndex), isSorting: false });
    this.props.onChange(arrayMove(items, oldIndex, newIndex));
    if (onSortEnd) {
      onSortEnd(this.refs.component);
    }
  };
  onRemove(item) {
    const { items } = this.state;
    items.some((data, i) => {
      if (item.id === data.id) {
        items.splice(i, 1);
        this.props.deleteAciton(item);
        this.props.onChange(items);
        this.setState({
          items,
        });
        return true;
      }
      return null;
    });
  }
  render() {
    const Component = this.props.component;
    const { items, isSorting } = this.state;
    const props = {
      isSorting,
      items,
      onSortEnd: this.onSortEnd,
      onSortStart: this.onSortStart,
      ref: 'component',
      useDragHandle: this.props.shouldUseDragHandle,
      onRemove: this.onRemove.bind(this),
    };

    return <Component {...this.props} {...props} />;
  }
}


// 拖动结束

const LeftListBlock = (props) => {
  const { name } = props;
  return (
    <div className={style.LeftListBlock}>
      <div className={style.circle}>
        <i className={`${style.peopleIcon} creamsicon`}>&#xe65e;</i>
      </div>
      {name || 'null'}
    </div>
  );
};

ShuttleLeft.defaultProps = {
  styles: style.baseLeft,
};
LeftListBlock.defaultProps = {
  userName: '',
};
