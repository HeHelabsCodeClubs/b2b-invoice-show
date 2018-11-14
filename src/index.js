import React, { Component } from 'react';
import DeliveryNotesList from './DeliveryNoteList';
import SingleCustomerInvoice from './SingleCustomerInvoice';
// import './style.css';

class InvoiceShow extends Component {
    render() {
        const { invoicesList, onLoad } = this.props;
        return (
            <div>
                {/* ********** Invoices Quick View List ************ */}
                <div className="col-md-4 col-sm-4 col-xs-12">
                    <DeliveryNotesList invoicesData={invoicesList} loader={onLoad} />
                </div>
                {/* ********** Invoice Wrapper ************ */}
                <div className="col-md-8 col-sm-8 col-xs-12 invoiceWrapper">
                    <SingleCustomerInvoice invoicesData={invoicesList} loader={onLoad} />
                </div>
            </div>
        );
    }
};

export default InvoiceShow;


