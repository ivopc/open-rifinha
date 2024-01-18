import type { Schema, Attribute } from '@strapi/types';

interface ApiBuyerBuyer extends Schema.CollectionType {
    collectionName: 'buyers';
    info: {
      singularName: 'buyer';
      pluralName: 'buyers';
      displayName: 'Buyer';
      description: '';
    };
    options: {
      draftAndPublish: true;
    };
    attributes: {
      full_name: Attribute.String;
      CPF: Attribute.String;
      email: Attribute.Email;
      phone_number: Attribute.String;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
        'api::buyer.buyer',
        'oneToOne'
      > &
        Attribute.Private;
      updatedBy: Attribute.Relation<
        'api::buyer.buyer',
        'oneToOne'
      > &
        Attribute.Private;
    };
}

  
interface ApiPremioPremio extends Schema.CollectionType {
    collectionName: 'premios';
    info: {
      singularName: 'premio';
      pluralName: 'premios';
      displayName: 'Prize';
      description: '';
    };
    options: {
      draftAndPublish: true;
    };
    attributes: {
      availability: Attribute.Boolean;
      title: Attribute.String;
      subtitle: Attribute.String;
      price: Attribute.Decimal;
      prize: Attribute.Integer;
      image: Attribute.String;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
        'api::premio.premio',
        'oneToOne'
      > &
        Attribute.Private;
      updatedBy: Attribute.Relation<
        'api::premio.premio',
        'oneToOne'
      > &
        Attribute.Private;
    };
};
  
interface ApiPurchasePurchase extends Schema.CollectionType {
    collectionName: 'purchases';
    info: {
      singularName: 'purchase';
      pluralName: 'purchases';
      displayName: 'Purchase';
      description: '';
    };
    options: {
      draftAndPublish: true;
    };
    attributes: {
      user_id: Attribute.String;
      prize_id: Attribute.String;
      payment_qr_code_image: Attribute.String;
      payment_qr_code: Attribute.String;
      already_paid: Attribute.Boolean;
      price_value: Attribute.Decimal;
      ticket_amount: Attribute.BigInteger;
      pix_payment_id: Attribute.String;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
        'api::purchase.purchase',
        'oneToOne'
      > &
        Attribute.Private;
      updatedBy: Attribute.Relation<
        'api::purchase.purchase',
        'oneToOne'
      > &
        Attribute.Private;
    };
};
  
interface ApiTicketTicket extends Schema.CollectionType {
    collectionName: 'tickets';
    info: {
      singularName: 'ticket';
      pluralName: 'tickets';
      displayName: 'Ticket';
      description: '';
    };
    options: {
      draftAndPublish: true;
    };
    attributes: {
      ticket_number: Attribute.BigInteger;
      purchase_id: Attribute.BigInteger;
      prize_id: Attribute.BigInteger;
      user_id: Attribute.BigInteger;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
        'api::ticket.ticket',
        'oneToOne'
      > &
        Attribute.Private;
      updatedBy: Attribute.Relation<
        'api::ticket.ticket',
        'oneToOne'
      > &
        Attribute.Private;
    };
};
  
interface ApiWebsiteConfigWebsiteConfig extends Schema.CollectionType {
    collectionName: 'website_configs';
    info: {
      singularName: 'website-config';
      pluralName: 'website-configs';
      displayName: 'WebsiteConfig';
      description: '';
    };
    options: {
      draftAndPublish: true;
    };
    attributes: {
      theme: Attribute.String;
      whatsapp: Attribute.String;
      instagram: Attribute.String;
      facebook: Attribute.String;
      telegram: Attribute.String;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
        'api::website-config.website-config',
        'oneToOne'
      > &
        Attribute.Private;
      updatedBy: Attribute.Relation<
        'api::website-config.website-config',
        'oneToOne'
      > &
        Attribute.Private;
    };
};
  
interface ApiWinnerWinner extends Schema.CollectionType {
    collectionName: 'winners';
    info: {
      singularName: 'winner';
      pluralName: 'winners';
      displayName: 'Winner';
    };
    options: {
      draftAndPublish: true;
    };
    attributes: {
      ticket: Attribute.BigInteger;
      winnerName: Attribute.String;
      prizeName: Attribute.String;
      prizeImageURL: Attribute.String;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
        'api::winner.winner',
        'oneToOne'
      > &
        Attribute.Private;
      updatedBy: Attribute.Relation<
        'api::winner.winner',
        'oneToOne'
      > &
        Attribute.Private;
    };
};

declare module '@strapi/types' {
    export module Shared {
      export interface ContentTypes {
        'api::buyer.buyer': ApiBuyerBuyer;
        'api::premio.premio': ApiPremioPremio;
        'api::purchase.purchase': ApiPurchasePurchase;
        'api::ticket.ticket': ApiTicketTicket;
        'api::website-config.website-config': ApiWebsiteConfigWebsiteConfig;
        'api::winner.winner': ApiWinnerWinner;
      }
    }
}