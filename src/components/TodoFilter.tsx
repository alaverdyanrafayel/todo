import React from 'react';
import {FilterBy} from '../types';

type TodoFilterProps = {
  changeFilterHandler: (filter: FilterBy) => void;
  filterButtons: Array<{label: string; value: FilterBy}>;
  filter: string;
  searchText: string;
  changeSearchTextHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  changeFilterHandler,
  filterButtons,
  filter,
  searchText,
  changeSearchTextHandler,
}) => {
  return (
    <div style={styles.container}>
      {filterButtons.map(({label, value}) => {
        const isActive = value === filter;
        const style = isActive ? styles.activeButton : styles.button;
        return (
          <button key={value} style={style} onClick={() => changeFilterHandler(value)}>
            {label}
          </button>
        );
      })}
      <input
        type='text'
        value={searchText}
        onChange={(ev) => changeSearchTextHandler(ev)}
        placeholder='Search...'
        style={styles.searchInput}
      />
    </div>
  );
};

const styles = {
  container: {
    marginTop: 30,
    marginBottom: 30,
  },
  button: {
    padding: '6px 20px',
    margin: 5,
    cursor: 'pointer',
    border: '1px solid #bbb',
    color: 'black',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  activeButton: {
    background: '#57a957',
    border: '1px solid #bbb',
    cursor: 'pointer',
    padding: '6px 20px',
    margin: 5,
    color: '#fff',
  },
  searchInput: {
    margin: 0,
    fontSize: 16,
    lineHeight: 10,
    height: 10,
    padding: 10,
    border: '1px solid rgb(221, 221, 221)',
    background: 'rgb(255, 255, 255)',
    borderRadius: 6,
    color: 'rgb(136, 136, 136)',
  },
};
