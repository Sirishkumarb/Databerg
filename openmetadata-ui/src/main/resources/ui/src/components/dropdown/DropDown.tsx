/*
 *  Copyright 2022 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { dropdownIcon as DropdownIcon } from '../../utils/svgconstant';
import AnchorDropDownList from './AnchorDropDownList';
import CheckBoxDropDownList from './CheckBoxDropDownList';
import { DropDownListItem, DropDownProp, DropDownType } from './types';

/**
 * @deprecated use AntD dropdown instead
 */
const DropDown: React.FC<DropDownProp> = ({
  className = '',
  disabled = false,
  label,
  type,
  icon: Icon,
  dropDownList,
  onSelect,
  selectedItems,
  disabledItems,
  hiddenItems = [],
  isDropDownIconVisible = true,
  isLableVisible = true,
  dataTestId = 'dropdown-item',
}: DropDownProp) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    setIsDisabled(disabled || dropDownList.length === 0);
  }, [disabled, dropDownList]);

  const renderList = (type: string) => {
    switch (type) {
      case DropDownType.LINK:
        return (
          <AnchorDropDownList
            dropDownList={dropDownList}
            setIsOpen={setIsOpen}
          />
        );
      case DropDownType.CHECKBOX:
        return (
          <CheckBoxDropDownList
            disabledItems={disabledItems}
            dropDownList={dropDownList}
            selectedItems={selectedItems}
            setIsOpen={setIsOpen}
            onSelect={onSelect}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={`relative d-inline-block text-left ${
          type === DropDownType.CHECKBOX && 'w-full'
        }`}
        data-testid={dataTestId}>
        <div>
          <button
            aria-expanded="true"
            aria-haspopup="true"
            className={classNames(
              'tw-inline-flex focus:tw-outline-none',
              type === DropDownType.CHECKBOX
                ? 'tw-rounded tw-text-body tw-text-gray-400 tw-border tw-border-main focus:tw-border-gray-500 w-full'
                : 'tw-justify-center',
              { 'cursor-not-allowed': isDisabled },
              className
            )}
            data-testid="menu-button"
            disabled={isDisabled}
            id={`menu-button-${label}`}
            type="button"
            onClick={() => setIsOpen((isOpen) => !isOpen)}>
            {type === DropDownType.CHECKBOX ? (
              <>
                {!selectedItems?.length ? (
                  label
                ) : (
                  <span className="d-flex flex-wrap tw--my-0.5">
                    {dropDownList.map((item: DropDownListItem) => {
                      if (
                        selectedItems
                          ?.filter((item) => !hiddenItems.includes(item))
                          .includes(item.value as string)
                      ) {
                        return (
                          <p
                            className={classNames(
                              'tw-bg-gray-200 tw-rounded tw-px-1 tw-text-grey-body tw-truncate tw-align-middle tw-m-0.5',
                              {
                                'tw-w-52': (item.name as string)?.length > 32,
                              }
                            )}
                            key={item.value}
                            title={item.name as string}>
                            {item.name}
                          </p>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </span>
                )}
              </>
            ) : (
              <>
                {Icon && Icon}
                {label && isLableVisible && (
                  <span
                    className={classNames('hover:tw-underline', {
                      'text-black': isOpen,
                      'text-base-color': !isOpen,
                    })}>
                    {label}
                  </span>
                )}

                {isDropDownIconVisible ? (
                  <DropdownIcon className="text-base-color m-t-xss" />
                ) : null}
              </>
            )}
          </button>
        </div>

        {isOpen && renderList(type)}
      </div>
    </>
  );
};

export default DropDown;
