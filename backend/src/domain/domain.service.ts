import { HttpStatus, Injectable } from "@nestjs/common";
import { Domain } from "./domain.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { DomainRequest, FetchDomainRequest } from "./dto";
import { isNullOrUndefined } from "src/utils/helper";
import { APIError, createErrorResponse } from "src/types/api";

@Injectable()
export class DomainService {
  constructor(@InjectModel(Domain.name) private domainModel: Model<Domain>) {}

  async createDomain(dto: DomainRequest): Promise<Domain | APIError> {
    const { domainName, isActive, isWhitelist } = dto;
    const domainFound = await this.domainModel.findOne({ domainName: domainName }).exec();
    if (domainFound) {
      return createErrorResponse(HttpStatus.BAD_REQUEST, "Domain already exist");
    }
    const domainItem = new this.domainModel({
      domainName: domainName,
      isWhitelist: isWhitelist,
      isActive: isActive,
      isNew: true,
    });

    try {
      const domain: Domain = await domainItem.save();
      return domain;
    } catch (error) {
      return createErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "We are facing error while creating domain",
        error
      );
    }
  }

  async updateDomain(id: string, dto: DomainRequest): Promise<Domain | APIError> {
    const { domainName, isActive, isWhitelist } = dto;
    const updateObj: DomainRequest = { domainName: domainName };
    if (!isNullOrUndefined(isWhitelist)) {
      updateObj.isWhitelist = isWhitelist;
    }
    if (!isNullOrUndefined(isActive)) {
      updateObj.isActive = isActive;
    }

    try {
      const domain = await this.domainModel.findByIdAndUpdate(id, updateObj, {
        new: true,
      });
      if (!domain) {
        return createErrorResponse(HttpStatus.BAD_REQUEST, "Domain not found with given ID.");
      }
      return domain;
    } catch (error) {
      return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong!", error);
    }
  }

  async deleteDomain(id: string): Promise<Domain | APIError> {
    try {
      const result = await this.domainModel.findByIdAndDelete(id, { new: true });
      if (!result) {
        return createErrorResponse(HttpStatus.BAD_REQUEST, "Domain not found with given ID.");
      }
      return result;
    } catch (error) {
      return createErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Domain not found with given ID."
      );
    }
  }

  async getDomainByIdOrName(request: FetchDomainRequest): Promise<Domain | APIError> {
    const { id, domainName } = request;

    if (isNullOrUndefined(id) && isNullOrUndefined(domainName)) {
      return createErrorResponse(
        HttpStatus.BAD_REQUEST,
        "You must enter ID or Name to fetch domain"
      );
    }

    try {
      let domain;
      if (id && domainName) {
        domain = await this.domainModel
          .findOne()
          .and([{ _id: new Types.ObjectId(id) }, { domainName: domainName }])
          .exec();
      } else {
        domain = await this.domainModel
          .findOne()
          .or([{ _id: new Types.ObjectId(id) }, { domainName: domainName }])
          .exec();
      }

      if (!domain) {
        return createErrorResponse(
          HttpStatus.BAD_REQUEST,
          "We are not able to identify any domain based on request."
        );
      }
      return domain;
    } catch (error) {
      return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong!", error);
    }
  }
}
