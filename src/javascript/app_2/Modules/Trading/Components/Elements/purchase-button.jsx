import classNames        from 'classnames';
import React             from 'react';
import { localize }      from '_common/localize';
import Button            from 'App/Components/Form/button.jsx';
import { IconTradeType } from 'Assets/Trading/Types';

const PurchaseButton = ({
    info,
    is_contract_mode,
    is_disabled,
    is_high_low,
    is_loading,
    onClickPurchase,
    trade_types,
    type,
}) => (
    <Button
        is_disabled={ is_contract_mode || is_disabled }
        id={`purchase_${type}`}
        className={classNames(
            'btn-purchase',
            { 'btn-purchase--disabled': (is_contract_mode || is_disabled) && !is_loading },
            { 'btn-purchase--animated': is_loading })}
        has_effect
        onClick={() => { onClickPurchase(info.id, info.stake, type); }}
    >
        <React.Fragment>
            <div className='btn-purchase__info btn-purchase__info--left'>
                <div className='btn-purchase__icon_wrapper'>
                    <IconTradeType
                        className='btn-purchase__icon'
                        type={!is_loading && is_high_low ? `${type.toLowerCase()}_barrier` : type.toLowerCase()}
                    />
                </div>
                <div className='btn-purchase__text_wrapper'>
                    <span className='btn-purchase__text'>{ !is_loading && localize('[_1]', trade_types[type])}</span>
                </div>
            </div>
            <div className='btn-purchase__effect-detail' />
            <div className='btn-purchase__info btn-purchase__info--right'>
                <div className='btn-purchase__text_wrapper'>
                    <span className='btn-purchase__text'>{is_loading && is_disabled ? '' : info.returns}</span>
                </div>
            </div>
        </React.Fragment>
    </Button>
);

export default PurchaseButton;
