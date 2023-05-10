import { List } from "immutable"

type Fun< input, output > = {
  (input : input) : output
  then:<finalOutput>(nextStep:Fun<output, finalOutput>) => Fun<input, finalOutput>
}

function Fun< input, output >( implementation:(input:input) => output ) : Fun< input, output > {
  const tmp = implementation as Fun<input, output>
  tmp.then = nextStep => Fun(input => nextStep(implementation(input)))
  return tmp
}

const incr : Fun<number, number> = Fun((input:number) => input + 1)
const decr : Fun<number, number> = Fun((input:number) => input - 1)
const double : Fun<number, number> = Fun((input:number) => input * 2)
const gtz : Fun<number, boolean> = Fun((input:number) => input > 0)
const not : Fun<boolean, boolean> = Fun((input:boolean) => !input)

const p0 : Fun<number, number> = incr.then(double)
const p1 : Fun<number, boolean> = incr.then(double).then(decr).then(gtz)
const p2 : Fun<number, boolean> = decr.then(decr).then(double).then(gtz)
const p3 : Fun<number, boolean> = p2.then(not)

const id = <a>(content:a) : Id<a> => content
type Id<a> = a
const mapId = <a,b>(f:Fun<a,b>) : Fun<Id<a>, Id<b>> => f.then(Fun(id))

type Countainer<a> = { content:a, counter:number }
const Countainer = <a>(content:a) : Countainer<a> => ({content:content, counter:0})
const mapCountainer = <a,b>(f:Fun<a,b>) : Fun<Countainer<a>, Countainer<b>> =>
  Fun(inputCountainer => ({...inputCountainer, content:f(inputCountainer.content)}))

type Option<a> = { kind:"empty" } | { kind:"full", content:a }
const empty = <a>() : Option<a> => ({ kind:"empty" })
const full = <a>(content:a) : Option<a> => ({ kind:"full", content:content })
const mapOption = <a,b>(f:Fun<a,b>) : Fun<Option<a>, Option<b>> =>
  Fun(inputOption => inputOption.kind == "empty" ? empty() : full(f(inputOption.content)))

const mapArray = <a,b>(f:Fun<a,b>) : Fun<Array<a>, Array<b>> => 
  Fun(inputArray => inputArray.map(f))
const mapList = <a,b>(f:Fun<a,b>) : Fun<List<a>, List<b>> => 
  Fun(l => l.map(f))

type X<a> = Array<Option<Countainer<a>>>
function f(xs:X<number>) : X<number> {
  return mapArray(mapOption(mapCountainer(double)))(xs)
}

type Functors<a> = {
  Id:Id<a>
  Array:Array<a>
  List:List<a>
  Option:Option<a>
  Countainer:Countainer<a>
}

type Unit = null
const Functor = <F extends keyof Functors<Unit>>(f:F) => f
type Then<F extends keyof Functors<Unit>,G> = { Before:F, After:G }
const Then = <F extends keyof Functors<Unit>,G>(f:F, g:G) : Then<F,G> => ({ Before:f, After:g })

const LLCO = Then("List", Then("List", Then("Countainer", Functor("Option"))))
const LLO = Then("List", Then("List", Functor("Option")))
const COL = Then("Countainer", Then("Option", Functor("List")))

type Apply<F, a> =
  F extends keyof Functors<Unit> ? Functors<a>[F]
  : F extends Then<infer G, infer H> ? Apply<G, Apply<H, a>>
  : "Cannot apply because F is neither primitive nor composed"

type Mapping<F> = <a,b>(f:Fun<a,b>) => Fun<Apply<F,a>, Apply<F,b>>
type Mappings = {
  [F in keyof Functors<Unit>]: Mapping<F>
}

const mappings : Mappings = {
  Id: mapId,
  Array: mapArray,
  Option: mapOption,
  Countainer: mapCountainer,
  List: mapList
}

const map = <F>(F:F) : Mapping<F> => 
  typeof(F) == "string" && F in mappings ? (mappings as any)[F]
  : "After" in (F as any) && "Before" in (F as any) ? 
    <a,b>(f:Fun<a,b>) => map((F as any)["Before"])(map((F as any)["After"])(f))
  : null!

function incrF<F>(functor:F) : Fun<Apply<F,number>, Apply<F,number>> {
  return Fun(input => map(functor)<number,number>(incr)(input))
}

const a = incrF(Functor("Array"))([1,2,3])
console.log(a)

const b = incrF(Then("Option", Functor("Array")))(full([1,2,3]))
console.log(b)

const c = incrF(Then("Array", Functor("Option")))([full(1),empty(), full(2),full(3)])
console.log(c)

