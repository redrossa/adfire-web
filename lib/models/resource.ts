export interface Resource {
  path: string;
  method?: string;
  searchParams?: Record<string, any>;
  body?: any;
}
