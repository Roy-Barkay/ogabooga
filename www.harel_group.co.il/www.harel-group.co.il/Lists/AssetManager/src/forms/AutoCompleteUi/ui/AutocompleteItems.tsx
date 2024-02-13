import React from 'react';

export interface AutocompleteItem {
    id: any;
    label: any;
    subLabel?: string;
}

export const AutocompleteItems = ({
                                      itemOptions = [],
                                      searchBy,
                                      search,
                                      updateValueByClick,
                                      sortFilteredOption
                                  }: any) => {

    const [searchItem, setSearchItem] = React.useState('');

    React.useLayoutEffect(() => {
        setSearchItem(search);
    }, [search])

    if (!itemOptions.length) {
        return null;
    }

    const orderFilter = () => {
        itemOptions.sort((a: any, b: any) => a?.label?.indexOf(searchItem) < b?.label?.indexOf(searchItem) ? -1 : 1);
    }

    const boldStartString = (value: string): JSX.Element => {
        if (!value.startsWith(searchItem)) {
            return <>{value}</>
        }
        const start = 0;
        const end = searchItem.length;
        const part1 = value?.substr(start, end);
        const part2 = value?.substr(end, value.length);
        return <><strong>{part1}</strong>{part2}</>
    };

    const boldContainString = (value: string): JSX.Element => {
        const start = value.indexOf(searchItem);
        if (start === -1) {
            return <>{value}</>
        }
        const end = searchItem.length;
        const part1 = value?.substr(0, start);
        const part2 = value?.substr(start, end);
        const part3 = value?.substr((part1 + part2).length, value.length);
        return <>{part1}<strong>{part2}</strong>{part3}</>
    };

    const boldSearchLettersOfFilter = (value: AutocompleteItem): JSX.Element => {
        switch (searchBy?.toUpperCase()) {
            case 'STARTFROM':
                return <>{boldStartString(value.label)}</>;
            case 'CONTAIN':
            default:
                return <>{boldContainString(value.label)}</>;
        }
    };

    const onfocusHandle = (e: React.FocusEvent<HTMLElement>) => {
        setSearchItem(e.target.innerText);
    };

    sortFilteredOption && orderFilter();
    return itemOptions.map((item: AutocompleteItem, index: number) =>
            <li tabIndex={0}
                role="option"
                key={item.label + index}
                onClick={() => updateValueByClick(item, index)}
                onKeyDown={(e: any) => {
                    if (e.key && e.key === 'Enter') {
                        e.preventDefault();
                        updateValueByClick(item, index)
                    }
                }}
                onFocus={onfocusHandle}>
                <span>{boldSearchLettersOfFilter(item)}</span>
                {item.subLabel && <span>{item.subLabel}
</span>}
            </li>
    )
        ;
}
