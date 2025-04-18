import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportParserService {
  constructor() {}

  parseReportData(rawData: any, year: string, quarter: string, month: string) {
    if (!rawData) return null;

    try {
      // Parse response if it's a string
      rawData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

      const commercialAndBusiness = {
        year: year,
        quarter: quarter,
        month: month,
        actual_revenue: rawData.actual_revenue || 0,
        budget: rawData.budget || 0,
        product_name: rawData.product_name || '',
        sales_per_product: rawData.sales_per_product || 0
      };

      const finance = {
        year: year,
        quarter: quarter,
        month: month,
        revenue: rawData.revenue || 0,
        cost_of_goods: rawData.cost_of_goods_sold || 0,
        gross_profit_loss: rawData.gross_profit_loss || 0,
        general_administrative: rawData.general_administrative || 0,
        interest: rawData.interest || 0,
        earn_before_tax: rawData.earn_before_tax || 0,
        taxes: rawData.taxes || 0,
        net_earning: rawData.net_earning || 0,
        ebidta: rawData.ebidta || 0,
        cash_inflow: rawData.cash_inflow || 0,
        cash_outflow: rawData.cash_outflow || 0,
        total_profit_loss: rawData.total_profit || 0,
        total_expenses: rawData.total_expenses || 0,
        income: rawData.income || 0,
        ebidta_margin: rawData.ebitda_margin || 0,
        gross_profit_margin: rawData.gross_profit_margin || 0,
        net_profit_margin: rawData.net_profit_margin || 0,
        cash: rawData.cash || 0,
        accounts_receivable: rawData.accounts_receivable || 0,
        inventories: rawData.inventories || 0,
        current_assets: rawData.current_assets || 0,
        total_assets: rawData.total_assets || 0,
        accounts_payable: rawData.account_payble || 0,
        debt: rawData.debt || 0,
        current_liabilities: rawData.current_liabilities || 0,
        total_liabilities: rawData.total_liabilities || 0,
        total_equity: rawData.total_equity || 0
      };

      const technology = {
        year: year,
        quarter: quarter,
        month: month,
        product_name: rawData.product_name || '',
        cost_of_sale: rawData.cost_of_goods_sold || 0,
        capital_expenditures: rawData.capital_expenditures || 0
      };

      return {
        finance,
        commercialAndBusiness,
        technology
      };

    } catch (error) {
      console.error('Error parsing report data:', error);
      return null;
    }
  }
}
