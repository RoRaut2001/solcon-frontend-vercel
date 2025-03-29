import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportParserService {
  constructor() {}

  parseReportData(rawData: any) {
    if (!rawData) return null;

    try {
      // Parse response if it's a string
      rawData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

      // Create structured objects
      const financeBalanceSheet = {
        id: rawData.id || '',
        account_payble: rawData.account_payble || 0,
        accounts_recivable: rawData.accounts_recivable || 0,
        cash: rawData.cash || 0,
        create_date: rawData.create_date || '',
        creditor_days: rawData.creditor_days || 0,
        creditor_goal: rawData.creditor_goal || 0,
        creditor_totaldue: rawData.creditor_totaldue || 0,
        creditor_bank_balance: rawData.creditor_bank_balance || 0,
        current_assets: rawData.current_assets || 0,
        current_liabilities: rawData.current_liabilities || 0,
        debitor_days: rawData.debitor_days || 0,
        debitor_goal: rawData.debitor_goal || 0,
        debitor_bank_balance: rawData.debitor_bank_balance || 0,
        debitor_totaldue: rawData.debitor_totaldue || 0,
        debt: rawData.debt || 0,
        ebitda_margin: rawData.ebitda_margin || 0,
        gross_profit_margin: rawData.gross_profit_margin || 0,
        inventories: rawData.inventories || 0,
        month: rawData.month || '',
        netprofit_margin: rawData.netprofit_margin || 0,
        quarter: rawData.quarter || '',
        total_assests: rawData.total_assests || 0,
        total_equity: rawData.total_equity || 0,
        total_liabilites: rawData.total_liabilites || 0,
        year: rawData.year || '',
        company_id: rawData.company_id || ''
      };

      const finance = {
        id: rawData.id || '',
        cash: rawData.cash || 0,
        cash_inflow: rawData.cash_inflow || 0,
        cash_outflow: rawData.cash_outflow || 0,
        costof_goods_sold: rawData.costof_goods_sold || 0,
        earningbefore_taxes: rawData.earningbefore_taxes || 0,
        ebidta: rawData.ebidta || 0,
        from_date: rawData.from_date || '',
        general_administrative: rawData.general_administrative || 0,
        income: rawData.income || 0,
        interest: rawData.interest || 0,
        gross_profit: rawData.gross_profit || 0,
        month: rawData.month || '',
        net_earning: rawData.net_earning || 0,
        quarter: rawData.quarter || '',
        revenue: rawData.revenue || 0,
        taxes: rawData.taxes || 0,
        to_date: rawData.to_date || '',
        total_expenses: rawData.total_expenses || 0,
        total_profit_loss: rawData.total_profit_loss || 0,
        year: rawData.year || '',
        company_id: rawData.company_id || '',
        general_expense: rawData.general_expense || 0,
        marketing_expense: rawData.marketing_expense || 0
      };

      const commercialAndBusiness = {
        id: rawData.id || '',
        budget: rawData.budget || 0,
        month: rawData.month || '',
        quarter: rawData.quarter || '',
        revenue: rawData.revenue || 0,
        year: rawData.year || '',
        company_id: rawData.company_id || '',
        product_name: rawData.product_name || '',
        product_sales: rawData.product_sales || 0
      };

      const technology = {
        id: rawData.id || '',
        capital_expenditures: rawData.capital_expenditures || 0,
        cost_of_service: rawData.cost_of_service || 0,
        month: rawData.month || '',
        product_name: rawData.product_name || '',
        quarter: rawData.quarter || '',
        year: rawData.year || '',
        company_id: rawData.company_id || ''
      };

      // Return structured data
      return {
        financeBalanceSheet,
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
