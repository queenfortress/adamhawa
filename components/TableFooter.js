import React, { useEffect } from "react"

import styles from "./TableFooter.module.css"


export function TableFooter({ page, onPageChange, totalRecords }) {
    return (
        <div className={styles.tableFooter}>
            <button
                className={styles.button}
                onClick={() => parseInt(page) - 1 <= 0 ? onPageChange(1) : onPageChange(parseInt(page) - 1)}>
                &larr; Previous
            </button>
            <button
                className={styles.button}
                onClick={() => parseInt(totalRecords) === 0 ? null : onPageChange(parseInt(page) + 1)}>
                Next &rarr;
            </button>
        </div>
    )
}

export function TableFooterPreLoadAll({ range, setPage, page, slice }) {
    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage])

    return (
        <div className={styles.tableFooter}>
            {range.map((el, index) => (
                <button
                    key={index}
                    className={`${styles.button} ${
                    page === el ? styles.activeButton : styles.inactiveButton
                    }`}
                    onClick={() => setPage(el)}>
                    {el}
                </button>
            ))}
        </div>
    )
}
