import React from 'react';


export const TodoFilter = ({
    changeFilterHandler,
    filterButtons,
    filter
}) => {
    return (
        <div style={styles.container}>
            {filterButtons.map(({ label, value }) => {
                const isActive = value === filter;
                const style = isActive ? styles.activeButton : styles.button;
                return (
                    <button key={value} style={style} onClick={() => changeFilterHandler(value)}>
                        {label}
                    </button>
                )
            })}
        </div>
    );
}

const styles = {
    container: {
        marginTop: 30,
        marginBottom: 30
    },
    button: {
        padding: "6px 20px",
        margin: 5,
        cursor: "pointer",
        border: "1px solid #bbb",
        color: "black",
        backgroundColor: "#fff",
        borderRadius: 2
    },
    activeButton: {
        background: "#57a957",
        border: "1px solid #bbb",
        cursor: "pointer",
        padding: "6px 20px",
        margin: 5,
        color: "#fff"
    }
}
