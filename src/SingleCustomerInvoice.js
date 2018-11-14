import _ from 'lodash';
import React, { Component } from 'react';
import ReactTable from 'react-table';
//import Jumbo from '../../reusable/Jumbo';
//import { CLOUDINARY_URL } from '../../../../config';
// import Loader from '../common/loader';

class SingleCustomerInvoice extends Component {
    constructor(props) {
      super(props);
      this.renderInvoiceOrders = this.renderInvoiceOrders.bind(this);
    }
    getColumnsData() {
      return [
        {
        id: 'orderID',
        Header: 'Order ID',
        accessor: (data) => {
            return (
              <div>{data.id}</div>
            );
        },
          width: 80
        }, {
          id: 'dateTime',
          Header: 'Date & Time',
          accessor: (data) => {
              return data.formated_date;
          }
        },{
          id: 'status',
          Header: 'Status',
          accessor: (data) => {
              return data.status;
          }
        }, {
          id: 'totalAmount',
          Header: 'Amount',
          accessor: (data) => {
              return `${data.amount} ${data.currency.code}`;
          }
        }
      ];
    }
    getTotalInvoicePrice(orders) {
      let totalPrice = 0;
      for (let i = 0; i < orders.length; i++) {
        totalPrice += orders[i].amount;
      }
      return totalPrice;
    }

    getClientCurrencyCode(orders) {
      return orders[0].currency.code;
    }
    renderInvoiceOrders(invoiceOrders) {
      if (!_.isEmpty(invoiceOrders)) {
        const consolidatedInvoiceData = invoiceOrders[0].consolidated_invoice.data;
        const TableData = invoiceOrders.map((item) => {
          return item.order.data
        });
        const columns = this.getColumnsData();
        const totalInvoicePrice = this.getTotalInvoicePrice(TableData);
        const currencyCode = this.getClientCurrencyCode(TableData)
        return (
          <div className="shadow-box">
          {/* ********** Invoice Top Panel ************ */}
          <div className="row no-gutters no-margin">
            <div className="create-header">
              <span className="create-title invoice-title">{`Invoice for ${consolidatedInvoiceData.customer.customer}`}</span>
              <span className="submit-button">
                  <span><button type="submit" className="invoice-btn"><div className="icon-invoice-icon"></div></button></span>
                  <span><button type="submit" className="edit-btn"><div className="icon-icon_edit"></div></button></span>
                  <span><button type="submit" className="view-btn"><div className="icon-eye-ico"></div></button></span>
                  <span><button type="submit" className="print-btn"><div className="icon-print-icon"></div></button></span>
                  <span><button type="submit" className="cancel"><div className="icon-send-icon"></div>Notify Customer</button></span>
              </span>
            </div>
          </div>

          {/* ********** Customer Details ************ */}
          <div className="invoiceHeader">
            <div className="row no-gutters">
              <div className="col-lg-6 col-md-8 col-sm-10">
                <div>
                  {/* <Jumbo image={`${CLOUDINARY_URL}/EMS_logo2.png`} addc='invoiceEMS-logo' /> */}
                </div>
                <div className="invoiceDets">
                
                  <div className="invoiceNum">{`Invoice no. ${consolidatedInvoiceData.id}`}</div>

                  <div className="row no-gutters">

                    <div className="col-md-6 col-xs-6">
                      <div className="invoiceDetsTitle">Customer</div>
                      {/* <div><Jumbo image={`${CLOUDINARY_URL}/HeHe_LOGO_Original_Landscape-small`} addc='client-logo' /></div> */}
                    </div>
                    <div className="col-md-6 col-xs-6">
                      <div className="invoiceDetsBold">{consolidatedInvoiceData.customer.customer}</div>
                      <div className="customerAddress">{consolidatedInvoiceData.customer.address}</div>
                    </div>
                    <div className="col-md-7 col-xs-8">
                      <div className="invoiceDetsTitle">Time Period</div>
                      <div className="invoiceDetsBold invoiceTime">{`${consolidatedInvoiceData.created_date} TO ${consolidatedInvoiceData.due_date}`}</div>
                    </div>
                    <div className="col-md-5 col-xs-4">
                      <div className="invoiceDetsTitle">Status</div>
                      <div className="invoiceDetsBold">{consolidatedInvoiceData.status}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ********** Table of services ************ */}
          <div className="transtable">
            <ReactTable 
            data={TableData}
            columns={columns}
            />
          </div>

          <div className="clientInvoiceTotal">
            <div className="invoicetotalDiv">
              <div className="invoicetotal">
                  <div className="totalTitle">SUBTOTAL</div>
                  <div className="total1">{`${currencyCode} ${totalInvoicePrice}`}</div>
                  <div className="totalTitle">VAT</div>
                  <div className="total2">{`${currencyCode} ${totalInvoicePrice}`}</div>
              </div>
            </div>
            <div className="invoicetotalDiv invoicetotalDiv1">
              <div className="invoicetotal">
                  <div className="totalTitle">TOTAL</div>
                  <div className="total3">{`${currencyCode} ${totalInvoicePrice}`}</div>
              </div>
            </div>
          </div>

          <div className="printNot">
            <span className="submit-button">
                  <button type="cancel" className="cancel"><div className="icon-print-icon"></div>Print Invoice</button>
                  <button type="submit" className="cancel"><div className="icon-send-icon"></div>Notify Customer</button>
              </span>
          </div>

        </div>
        );
      }
      return this.props.loader;
    }

    render() {
        const { invoicesData } = this.props;
        return (
            <div>
              {this.renderInvoiceOrders(invoicesData)}
            </div>
        );

    }
}

export default SingleCustomerInvoice;