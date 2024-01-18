import type { Schema, Attribute } from '@strapi/strapi';

export interface PfapiTypesBool extends Schema.Component {
  collectionName: 'components_pfapi_types_bools';
  info: {
    displayName: 'bool';
    icon: 'angle-right';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    value: Attribute.Boolean;
  };
}

export interface PfapiTypesDecimal extends Schema.Component {
  collectionName: 'components_pfapi_types_decimals';
  info: {
    displayName: 'Decimal';
    icon: 'angle-right';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    value: Attribute.Decimal;
  };
}

export interface PfapiTypesInteger extends Schema.Component {
  collectionName: 'components_pfapi_types_integers';
  info: {
    displayName: 'Integer';
    icon: 'angle-right';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    value: Attribute.Integer;
  };
}

export interface PfapiTypesIpPrefix extends Schema.Component {
  collectionName: 'components_pfapi_types_ip_prefixes';
  info: {
    displayName: 'IpPrefix';
    icon: 'align-left';
    description: '';
  };
  attributes: {
    ip_cidr: Attribute.String;
    prefix: Attribute.String;
    status: Attribute.Enumeration<['unlimited', 'blocked']> &
      Attribute.Required;
    comment: Attribute.String;
  };
}

export interface PfapiTypesJson extends Schema.Component {
  collectionName: 'components_pfapi_types_jsons';
  info: {
    displayName: 'json';
    icon: 'angle-right';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    value: Attribute.JSON;
  };
}

export interface PfapiTypesMedia extends Schema.Component {
  collectionName: 'components_pfapi_types_media';
  info: {
    displayName: 'media';
    icon: 'angle-right';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    media: Attribute.Media;
  };
}

export interface PfapiTypesMultimedia extends Schema.Component {
  collectionName: 'components_pfapi_types_multimedia';
  info: {
    displayName: 'multimedia';
    icon: 'angle-right';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    media: Attribute.Media;
  };
}

export interface PfapiTypesRichtext extends Schema.Component {
  collectionName: 'components_pfapi_types_richtexts';
  info: {
    displayName: 'richtext';
    icon: 'angle-right';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    value: Attribute.RichText;
  };
}

export interface PfapiTypesText extends Schema.Component {
  collectionName: 'components_pfapi_types_texts';
  info: {
    displayName: 'text';
    icon: 'angle-right';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    value: Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'pfapi-types.bool': PfapiTypesBool;
      'pfapi-types.decimal': PfapiTypesDecimal;
      'pfapi-types.integer': PfapiTypesInteger;
      'pfapi-types.ip-prefix': PfapiTypesIpPrefix;
      'pfapi-types.json': PfapiTypesJson;
      'pfapi-types.media': PfapiTypesMedia;
      'pfapi-types.multimedia': PfapiTypesMultimedia;
      'pfapi-types.richtext': PfapiTypesRichtext;
      'pfapi-types.text': PfapiTypesText;
    }
  }
}
