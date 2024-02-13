import React, {FC, useEffect, useState} from 'react';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import styles from './Address.module.scss';
import AutoCompleteUi from '../AutoCompleteUi/AutoCompleteUi';
import {TextInput} from '../index';

export interface AddressProps extends StylesAndBo {

    value?: any;
    /**
     * onChange callback
     */
    onChange?: (event: {
        mailBox: any;
        city: any;
        street: any;
        postalCode: any;
        houseNumber: any;
        apartmentNumber: any,
        haveStreet: boolean
    }) => void;

    baseUrl?: string;

    proxy?: string;

    freeSolo?: { city?: boolean, street?: boolean, houseNumber?: boolean };

    searchBy?: {
        city?: 'CONTAIN' | 'STARTFROM',
        street?: 'CONTAIN' | 'STARTFROM',
        houseNumber?: 'CONTAIN' | 'STARTFROM'
    };

    show?: {
        street?: boolean;
        houseNumber?: boolean,
        postalCode?: boolean,
        mailBox?: boolean,
        apartmentNumber?: boolean
    };

    allowZeroHouseNum?: boolean;

    disabled?: boolean;

    required?: {
        city?: boolean,
        street?: boolean,
        houseNumber?: boolean,
        apartmentNumber?: boolean,
        mailBox?: boolean,
        postalCode?: boolean
    };

    label?: {
        city?: string,
        street?: string,
        houseNumber?: string,
        apartmentNumber?: string,
        mailBox?: string,
        postalCode?: string
    };

    hint?: {
        city?: string,
        street?: string,
        houseNumber?: string,
        apartmentNumber?: string,
        mailBox?: string,
        postalCode?: string
    };

    error?: {
        city?: boolean,
        street?: boolean,
        houseNumber?: boolean,
        apartmentNumber?: boolean,
        mailBox?: boolean,
        postalCode?: boolean
    };

    errorMessage?: {
        city?: string | { required: string, notfound: string, general: string },
        street?: string,
        houseNumber?: string,
        apartmentNumber?: string,
        mailBox?: string,
        postalCode?: string
    };

    className?: string;

    hideAsterisk?: {
        city?: boolean,
        street?: boolean,
        houseNumber?: boolean,
        apartmentNumber?: boolean,
        mailBox?: boolean,
        postalCode?: boolean
    };

    commonV3?: boolean;
}

export const Address: FC<AddressProps> = (props) => {

    const {
        style = {},
        onChange,
        bo = 'hds-address',
        baseUrl,
        proxy,
        freeSolo = {city: false, street: false, houseNumber: false},
        show = {street: true, houseNumber: true, postalCode: true, mailBox: true, apartmentNumber: true},
        disabled = {
            city: false,
            street: false,
            houseNumber: false,
            postalCode: false,
            mailBox: false,
            apartmentNumber: false
        },
        label = {
            city: 'עיר',
            street: 'רחוב',
            houseNumber: 'מספר בית',
            apartmentNumber: 'דירה',
            mailBox: 'תיבת דואר',
            postalCode: 'מיקוד'
        },
        required = {houseNumber: false, apartmentNumber: false, mailBox: false, postalCode: false},
        hint = {city: '', street: '', houseNumber: '', apartmentNumber: '', mailBox: '', postalCode: ''},
        searchBy = {city: 'CONTAIN', street: 'CONTAIN', houseNumber: 'CONTAIN'},
        error = {
            city: false,
            street: false,
            houseNumber: false,
            postalCode: false,
            mailBox: false,
            apartmentNumber: false
        },
        errorMessage,
        value,
        allowZeroHouseNum = false,
        hideAsterisk = {
            city: false,
            street: false,
            houseNumber: false,
            apartmentNumber: false,
            mailBox: false,
            postalCode: false
        }
    } = props;

    const [cities, setCities] = useState([]);
    const [streets, setStreets] = useState([]);
    const [houseNumbers, setHouseNumbers] = useState([]);
    const [dataReceived, setDataReceived] = useState({
        city: false,
        street: false,
        houseNumber: false
    });
    const [chosenOptions, setChosenOptions] = useState({
        city: value?.city,
        street: value?.street,
        houseNumber: value?.houseNumber,
        postalCode: value?.postalCode,
        apartmentNumber: value?.apartmentNumber,
        mailBox: value?.mailBox,
        haveStreet: !!value?.street
    });
    const [errors, setErrors] = useState({
        city: true,
        street: true,
        houseNumber: true,
        postalCode: true,
        apartmentNumber: true,
        mailBox: true,
        haveStreet: false
    });


    const urlPrefix = baseUrl || 'https://digital.harel-group.co.il';
    let url = urlPrefix + '/static-data/address';
    if (proxy) {
        url = proxy + url;
    }

    const pathUrls = {
        cities: () => `${url}/cities`,
        streets: (cityCode: string) => `${url}/streets/?cityCode=${cityCode}`,
        houseNumbers: (cityCode: string, streetCode: string) =>
            `${url}/postal-codes/?cityCode=${cityCode}&streetCode=${streetCode}&nonzeroHouseNum=${allowZeroHouseNum}`,
    };

    const fetchData = async (_type: string, url: string, formatter: any, setterFunc: any) => {
        try {
            let res = await fetch(url).then(d => d.json()).then(res => {
                return res;
            });
            if (!res) {
                res = [];
            }
            setterFunc(() => {
                return formatter(res)
            });

        } catch (err) {
            console.error(err)
        }
    }


    useEffect(() => {
        fetchData('city', pathUrls.cities(), citiesFormatter, setCities)
    }, []);

    useEffect(() => {
        if (cities.length) {
            setDataReceived({...dataReceived, city: true})
        } else {
            setDataReceived({...dataReceived, city: false})
        }
    }, [JSON.stringify(cities)]);

    useEffect(() => {
        if (streets.length) {
            setDataReceived({...dataReceived, street: true})
        } else {
            setDataReceived({...dataReceived, street: false})
        }
    }, [JSON.stringify(streets)]);

    useEffect(() => {
        if (houseNumbers.length) {
            setDataReceived({...dataReceived, houseNumber: true})
        } else {
            setDataReceived({...dataReceived, houseNumber: false})
        }
    }, [JSON.stringify(houseNumbers)])

    useEffect(() => {
        if (!!chosenOptions.city?.value) {
            fetchData('street', pathUrls.streets(chosenOptions.city?.value), streetsFormatter, setStreets)
        }
    }, [JSON.stringify(chosenOptions.city)]);

    useEffect(() => {
        if (dataReceived.city && dataReceived.street) {
            const cityCode = chosenOptions.city?.value
            const streetCode = chosenOptions.street?.value
            if (streetCode) {
                fetchData(
                    'houseNumber',
                    pathUrls.houseNumbers(cityCode, streetCode),
                    postalCodeFormatter,
                    setHouseNumbers,
                );
            } else {
                setHouseNumbers([]);
                setChosenOptions(prevState => ({
                    ...prevState,
                    houseNumber: null
                }))
            }
        }
    }, [dataReceived.street, JSON.stringify(chosenOptions.street)]);

    useEffect(() => {
        onChange?.(chosenOptions)
    }, [JSON.stringify(chosenOptions)])

    useEffect(() => {
        setDisabledStreet();
        setDisabledHouse();
    }, [disabled]);

    useEffect(() => {
        setChosenOptions({
            city: value?.city,
            street: value?.street,
            houseNumber: value?.houseNumber,
            postalCode: value?.postalCode,
            apartmentNumber: value?.apartmentNumber,
            mailBox: value?.mailBox,
            haveStreet: !!value?.street
        })
    }, [value]);

    /* helper functions ::: START */
    const trimStr = (value: any) => {
        return value || value === 0 ? value.toString().trim() : '';
    };
    const citiesFormatter = (data: any) => {
        if (Array.isArray(data)) {
            return data.map((i) => ({
                label: i.cityName.replaceAll('  ', ''), //trimStr(i.cityName).replaceAll("  ", ""),
                value: i.cityCode,
                cityType: i.cityType,
                postalCode: i.postalCode7 !== 0 ? trimStr(i.postalCode7) : '',
            }));
        }
        return [];
    };
    const streetsFormatter = (data: any) => {
        if (Array.isArray(data)) {
            return data.map(i => ({
                label: trimStr(i.streetName), value: i.streetNumber,
            }));
        }
        return [];
    };
    const postalCodeFormatter = (data: any) => {
        if (Array.isArray(data)) {
            return data.map(i => {
                let entrance = trimStr(i.entrance);
                let houseNumber = trimStr(i.houseNumber);
                return {
                    label: entrance ? `${houseNumber} ${entrance}` : houseNumber,
                    value: entrance ? `${houseNumber}${entrance}` : houseNumber,
                    postalCode: trimStr(i.postalCode7),
                };
            });
        }
        return [];
    };
    const getHouseNumberEventValue = (houseNumber: any) => {
        return (typeof houseNumber === 'object') ? {
            // @ts-ignore
            label: houseNumber?.label,
            // @ts-ignore
            value: houseNumber?.postalCode || houseNumber?.value,
            // @ts-ignore
            actualValue: houseNumber?.value || houseNumber?.actualValue,
        } : houseNumber;
    };
    /* helper functions ::: END  */

    const setDisabledStreet = () => {
        if (!freeSolo?.street && !chosenOptions.city?.value && dataReceived.city) {
            return true
        } else if (!freeSolo?.street && !streets.length) {
            return true
        }
        return false
    }

    const setDisabledPostalCode = () => {
        if (freeSolo?.street) {
            return false;
        } else if (!chosenOptions.city?.value) {
            return true;
        } else if (chosenOptions.city?.value && !chosenOptions.city?.postalCode) {
            return true;
        } else if (chosenOptions.city?.value && !chosenOptions.city?.postalCode && !chosenOptions.street?.value) {
            return true
        }
        return false;
    }

    const setDisabledHouse = () => {
        if (!freeSolo?.houseNumber && !streets.length && dataReceived.street) {
            return true
        } else if (!freeSolo?.street && !houseNumbers.length) {
            return true
        }
        return false
    }

    const handleChangeCity = (city: any) => {
        if (dataReceived.city) {
            if (!city?.value) {
                setChosenOptions((prevState) => ({
                    ...prevState,
                    city: city?.label ? {...city} : {},
                    postalCode: '',
                    street: null,
                    houseNumber: null,
                    apartmentNumber: '',
                    mailBox: null,
                    haveStreet: false
                }))
                setStreets([])
                setHouseNumbers([])
                setErrors(prevErr => ({
                    ...prevErr,
                    city: false,
                    street: false,
                    houseNumber: false,
                    postalCode: false,
                    apartmentNumber: false,
                    mailBox: false,
                    haveStreet: false
                }))
            } else {
                setChosenOptions((prevState) => {
                    if (city?.label !== prevState.city?.label) {
                        return {
                            ...prevState,
                            city: {
                                ...city
                            },
                            postalCode: city?.postalCode,
                            street: null,
                            houseNumber: null,
                            haveStreet: !!(city?.cityType === 2)
                        }

                    } else {
                        return {...prevState}
                    }
                })
            }
        }
    }

    const handleChangeStreet = (street: any) => {
        if (!freeSolo.street && dataReceived.city && dataReceived.street) {
            setChosenOptions((prevState) => {
                if (street?.label !== prevState.street?.label) {
                    return {
                        ...prevState,
                        postalCode: prevState?.city?.postalCode || '',
                        houseNumber: null,
                        mailBox: null,
                        street: street?.label ? street : null,
                        apartmentNumber: ''
                    }
                } else {
                    return {...prevState}
                }
            })
        } else if (freeSolo.street) {
            setChosenOptions((prevState) => {
                return {...prevState, street: street?.label ? street : null}
            })
        }
    }

    const handleChangeHouseNumber = (houseNumber: any) => {
        const houseNumberObject = getHouseNumberEventValue(houseNumber);
        if (!freeSolo.houseNumber && dataReceived.city && dataReceived.street && dataReceived.houseNumber) {
            setChosenOptions(prevState => {
                if (houseNumberObject?.label !== prevState?.houseNumber?.label) {
                    return {
                        ...prevState,
                        houseNumber: houseNumberObject?.label ? houseNumberObject : null,
                        postalCode: houseNumberObject?.value || prevState.city?.postalCode || '',
                        apartmentNumber: ''
                    }
                } else {
                    return {
                        ...prevState,
                    }
                }
            })
            setErrors(prevErr => ({
                ...prevErr,
                postalCode: false,
            }))
        } else if (freeSolo.houseNumber) {
            setChosenOptions(prevState => {
                return {...prevState, houseNumber: houseNumberObject?.label || '',}
            });
        }
    }

    const handleInputChange = (value: string, key: string) => {
        let numValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        switch (key) {
            case 'postalCode':
                value = numValue;
                if (!value) {
                    setErrors(prevErr => ({
                        ...prevErr,
                        postalCode: true,
                    }))
                } else {
                    setErrors(prevErr => ({
                        ...prevErr,
                        postalCode: false,
                    }))
                }
                break;
            case 'mailBox':
                value = numValue;
                if (!value) {
                    setErrors(prevErr => ({
                        ...prevErr,
                        mailBox: true,
                    }))
                } else {
                    setErrors(prevErr => ({
                        ...prevErr,
                        mailBox: false,
                    }))
                }
                break;
            case 'apartmentNumber':
                value = numValue;
                if (!value) {
                    setErrors(prevErr => ({
                        ...prevErr,
                        apartmentNumber: true,
                    }))
                } else {
                    setErrors(prevErr => ({
                        ...prevErr,
                        apartmentNumber: false,
                    }))
                }
                break;
        }
        setChosenOptions(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    const onBlurInputHandler = (e: any, key: string) => {
        switch (key) {
            case 'postalCode':
                if (!e.currentTarget.value) {
                    setErrors(prevErr => ({
                        ...prevErr,
                        postalCode: true,
                    }))
                } else {
                    setErrors(prevErr => ({
                        ...prevErr,
                        postalCode: false,
                    }))
                }
                break;
            case 'mailBox':
                if (!e.currentTarget.value) {
                    setErrors(prevErr => ({
                        ...prevErr,
                        mailBox: true,
                    }))
                } else {
                    setErrors(prevErr => ({
                        ...prevErr,
                        mailBox: false,
                    }))
                }
                break;
            case 'apartmentNumber':
                if (!e.currentTarget.value) {
                    setErrors(prevErr => ({
                        ...prevErr,
                        apartmentNumber: true,
                    }))
                } else {
                    setErrors(prevErr => ({
                        ...prevErr,
                        apartmentNumber: false,
                    }))
                }
                break;
        }
    }

    const textInputErrorMessageManager = (hasMessage?: string, isRequired?: boolean): string | undefined => {
        if (!!hasMessage) return hasMessage
        else if (isRequired) return 'שדה חובה';
        else return undefined
    }

    return (
        <div style={style} data-hrl-bo={bo}
             className={`${props.className} ${props.commonV3 ? styles.commonV3 : ''} ${styles.Address}`}>
            <AutoCompleteUi items={cities}
                            onSelect={handleChangeCity}
                            onChange={handleChangeCity}
                            label={label?.city}
                            searchBy={searchBy?.city}
                            disabled={!cities.length}
                            required={required?.city}
                            error={error?.city}
                            errorMessages={errorMessage?.city}
                            hint={hint?.city}
                            value={chosenOptions?.city?.label}
                            freeSolo={freeSolo?.city}
                            isObjectOutput={true}
                            bo={`${bo}_Address_autocomplete_1`}
                            commonV3={props.commonV3}
                            hideAsterisk={hideAsterisk.city}
            />
            {show.street &&
              <AutoCompleteUi items={streets}
                              onSelect={handleChangeStreet}
                              onChange={handleChangeStreet}
                              label={label?.street}
                              searchBy={searchBy?.street}
                              disabled={setDisabledStreet()}
                              required={!!streets.length && required?.street}
                              error={error?.street}
                              errorMessages={errorMessage?.street}
                              hint={hint?.street}
                              freeSolo={freeSolo?.street}
                              value={chosenOptions?.street?.label}
                              isObjectOutput={true}
                              bo={`${bo}_Address_autocomplete_2`}
                              commonV3={props.commonV3}
                              hideAsterisk={hideAsterisk.street}
              />}

            {show.houseNumber &&
              <AutoCompleteUi items={houseNumbers}
                              onSelect={handleChangeHouseNumber}
                              onChange={handleChangeHouseNumber}
                              label={label?.houseNumber}
                              searchBy={searchBy?.houseNumber}
                              disabled={setDisabledHouse()}
                              required={!!houseNumbers.length && required?.houseNumber}
                              error={error?.houseNumber}
                              errorMessages={errorMessage?.houseNumber}
                              hint={hint?.houseNumber}
                              freeSolo={freeSolo?.houseNumber}
                              value={chosenOptions?.houseNumber?.label}
                              isObjectOutput={true}
                              bo={`${bo}_Address_autocomplete_3`}
                              commonV3={props.commonV3}
                              hideAsterisk={hideAsterisk.houseNumber}
              />
            }
            {show.postalCode &&
              <TextInput
                label={label?.postalCode}
                value={chosenOptions.postalCode || ''}
                onChange={(event) => handleInputChange(event, 'postalCode')}
                onBlur={(e) => onBlurInputHandler(e, 'postalCode')}
                disabled={setDisabledPostalCode()}
                required={required?.postalCode}
                error={error?.postalCode || errors.postalCode}
                errorMessage={textInputErrorMessageManager(errorMessage?.postalCode, required?.postalCode)}
                hint={hint?.postalCode}
                bo={`${bo}_Address_TextInput_1`}
                type={'tel'}
                maxlength={7}
                commonV3={props.commonV3}
                hideAsterisk={hideAsterisk.postalCode}
              />
            }
            {show.mailBox &&
              <TextInput
                label={label?.mailBox}
                value={chosenOptions.mailBox || ''}
                onChange={(event) => handleInputChange(event, 'mailBox')}
                onBlur={(e) => onBlurInputHandler(e, 'mailBox')}
                disabled={!freeSolo?.street && !chosenOptions.city?.value}
                required={required?.mailBox}
                error={error?.mailBox || errors.mailBox}
                errorMessage={textInputErrorMessageManager(errorMessage?.mailBox, required?.mailBox)}
                hint={hint?.mailBox}
                bo={`${bo}_Address_TextInput_2`}
                type={'tel'}
                maxlength={5}
                commonV3={props.commonV3}
                hideAsterisk={hideAsterisk.mailBox}
              />
            }
            {show.apartmentNumber &&
              <TextInput
                label={label?.apartmentNumber}
                value={chosenOptions.apartmentNumber || ''}
                onChange={(event) => handleInputChange(event, 'apartmentNumber')}
                onBlur={(e) => onBlurInputHandler(e, 'apartmentNumber')}
                disabled={!freeSolo?.street && !chosenOptions.houseNumber?.label}
                required={required?.apartmentNumber}
                error={error?.apartmentNumber || errors.apartmentNumber}
                errorMessage={textInputErrorMessageManager(errorMessage?.apartmentNumber, required?.apartmentNumber)}
                hint={hint?.apartmentNumber}
                bo={`${bo}_Address_TextInput_3`}
                type={'tel'}
                commonV3={props.commonV3}
                hideAsterisk={hideAsterisk.apartmentNumber}
              />
            }
        </div>

    );
}
