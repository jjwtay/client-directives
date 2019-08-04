//@ts-ignore
import convert from 'convert-units'

export default ({ from, to }: { from: string, to: string }) => (value: any) => convert(value).from(from).to(to)