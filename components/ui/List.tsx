import React, { useRef } from 'react';
import { useFocusRing, useGridList, useGridListItem, mergeProps } from 'react-aria';
import { useListState } from 'react-stately';
import { SearchResult } from '../searchresults';

interface ListProps {
  items: SearchResult[];
  renderItem: (item: SearchResult) => React.ReactNode;
  selectionMode?: 'none' | 'single' | 'multiple';
}

export function List(props: ListProps) {
    let state = useListState<SearchResult>(props);
    let ref = useRef<HTMLUListElement>(null);
    let { gridProps } = useGridList(props, state, ref);

    return (
    <ul {...gridProps} ref={ref} className="list">
        {props.items.map((item, index) => (
        <ListItem key={index} item={item} state={state} renderItem={props.renderItem} />
        ))}
    </ul>
    );
}

interface ListItemProps {
    item: SearchResult;
    state: any;
    renderItem: (item: SearchResult) => React.ReactNode;
}

const convertToNode = (item: SearchResult): any => ({
  key: item.username,
  value: item,
});

const ListItem: React.FC<ListItemProps> = ({ item, state, renderItem }) => {
    let ref = useRef<HTMLLIElement>(null);
    let node = convertToNode(item);
  let { rowProps, gridCellProps, isPressed } = useGridListItem({ node }, state, ref);

  let { isFocusVisible, focusProps } = useFocusRing();
  let showCheckbox = state.selectionManager.selectionMode !== 'none' &&
    state.selectionManager.selectionBehavior === 'toggle';

  return (
    <li
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
      className={`${isPressed ? 'pressed' : ''} ${
        isFocusVisible ? 'focus-visible' : ''
      }`}
    >
      {renderItem(item)}
    </li>
  );
}
