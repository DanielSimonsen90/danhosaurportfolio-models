declare type Hovedforløb = 'Hovedforløb 1' | 'Hovedforløb 2' | 'Hovedforløb 3' | 'Hovedforløb 4' | 'Hovedforløb 5' | 'Hovedforløb 6';
declare type Skolepraktik = 'Skolepraktik 1' | 'Skolepraktik 2' | 'Skolepraktik 3' | 'Skolepraktik 4' | 'Skolepraktik 5' | 'Skolepraktik 6';
export { Hovedforløb, Skolepraktik };
declare type PlanLocation = Hovedforløb | Skolepraktik | 'Fritid';
export default PlanLocation;
