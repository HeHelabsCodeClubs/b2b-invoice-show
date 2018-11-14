import _ from 'lodash';
import React, { Component } from 'react';

class DeliveryNotesList extends Component {
    constructor(props) {
        super(props);
        this.renderInvoices = this.renderInvoices.bind(this);
    }   

    renderInvoices(invoices) {
        if (!_.isEmpty(invoices)) {
            const invoicesList = invoices.map((item) => {
                return (
                    <a href="#" key={item.id}>
                        <div className="invoiceNumQuickView">
                        <div className="row">
                            <div className="col-md-6 col-xs-6">
                            <div className="invoiceNum">{`DN-${item.id}`}</div>
                            <div className-="companyName">{item.consolidated_invoice.data.customer.customer}</div>
                            </div>
                            <div className="col-md-6 col-xs-6">
                                <div className="invoiceDate">{item.created_date}</div>
                            </div>
                        </div>
                        </div>
                    </a>
                )
            });
            return (
                <div className="invoiceListWrapper">
                    {invoicesList}
                </div>
            )
        }
        return this.props.loader;
    }
    
    render() {
        const { invoicesData } = this.props;
        return (
            <div className="invoiceQuickView">
                <div className="quickViewTitle">Delivery notes</div>
                {this.renderInvoices(invoicesData)}
                <div className="expandDiv">
                <span className="submit-button">
                        <button type="cancel" className="cancel">Expand Table</button>
                    </span>
                </div>
            </div>
        );
    }
}

export default DeliveryNotesList;