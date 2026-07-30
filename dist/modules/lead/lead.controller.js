"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadController = void 0;
const asyncHandler_1 = require("../../common/utils/asyncHandler");
const apiResponse_1 = require("../../common/utils/apiResponse");
const lead_service_1 = require("./lead.service");
const httpStatus_1 = require("../../common/constants/httpStatus");
class LeadController {
    constructor() {
        this.getAllLeads = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const leads = await lead_service_1.leadService.getAllLeads(req.query);
            return (0, apiResponse_1.apiResponse)({
                res,
                message: "Leads fetched successfully",
                data: leads,
            });
        });
        this.getLeadById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const leadId = req.params.id;
            const lead = await lead_service_1.leadService.getLeadById(leadId);
            return (0, apiResponse_1.apiResponse)({
                res,
                message: "Lead fetched successfully",
                data: lead,
            });
        });
        this.createLead = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const leadData = req.body;
            const lead = await lead_service_1.leadService.createLead(leadData);
            return (0, apiResponse_1.apiResponse)({
                res,
                statusCode: httpStatus_1.HTTP_STATUS.CREATED,
                message: "Lead created successfully",
                data: lead,
            });
        });
        this.updateLead = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const leadId = req.params.id;
            const updateData = req.body;
            const lead = await lead_service_1.leadService.updateLead(leadId, updateData);
            return (0, apiResponse_1.apiResponse)({
                res,
                message: "Lead updated successfully",
                data: lead,
            });
        });
        this.deleteLead = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const leadId = req.params.id;
            await lead_service_1.leadService.deleteLead(leadId);
            return (0, apiResponse_1.apiResponse)({
                res,
                message: "Lead deleted successfully",
                data: null,
            });
        });
        this.searchLeads = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const leads = await lead_service_1.leadService.searchLeads(req.query);
            return (0, apiResponse_1.apiResponse)({
                res,
                message: "Leads found successfully",
                data: leads,
            });
        });
        this.filterLeads = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const leads = await lead_service_1.leadService.filterLeads(req.query);
            return (0, apiResponse_1.apiResponse)({
                res,
                message: "Leads filtered successfully",
                data: leads,
            });
        });
    }
}
exports.leadController = new LeadController();
