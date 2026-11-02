import db from '../../data/db.json'

export const categories = db.categories;
export const stores = db.stores;
export const events = db.events;
export const vacancies = db.vacancies;
export const premises = db.premises;
export const leasingInquiries = (db as any).leasingInquiries || [];
export const jobApplications = (db as any).jobApplications || [];
