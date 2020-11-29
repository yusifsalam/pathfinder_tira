export class Node {
  id: number
  positionX: number
  positionY: number

  private _fValue: number
  private _gValue: number
  private _hValue: number

  private _isWalkable: boolean
  private _parentNode: Node

  constructor(params: INodeConstructor) {
    this.id = params.id
    this.positionX = params.positionX
    this.positionY = params.positionY
    this._fValue = 0
    this._gValue = 0
    this._hValue = 0
    this._isWalkable = params.isWalkable
    this._parentNode = null
  }

  /**
   * Calculate and update the f-value of a node
   * @private
   */
  private calculateFValue(): void {
    this._fValue = this._gValue + this._hValue
  }

  /**
   * Sets the g-value and triggers f-value update
   * @param value
   */
  set gValue(value: number) {
    this._gValue = value
    this.calculateFValue()
  }

  /**
   * Sets the h-value and triggers f-value update
   * @param value
   */
  set hValue(value: number) {
    this._hValue = value
    this.calculateFValue()
  }

  /**
   * Sets the walkability of a node
   * @param value
   */
  set isWalkable(value: boolean) {
    this._isWalkable = value
  }

  /**
   * Sets the parent Node of a node
   * @param value
   */
  set parentNode(value: Node) {
    this._parentNode = value
  }

  /**
   * Gets the f-value of a node
   */
  get fValue(): number {
    return this._fValue
  }

  /**
   * Gets the g-value of a node
   */
  get gValue(): number {
    return this._gValue
  }

  /**
   * Gets the h-value of a node
   */
  get hValue(): number {
    return this._hValue
  }

  /**
   * Gets the boolean value of the walkability of a node
   */
  get isWalkable(): boolean {
    return this._isWalkable
  }

  /**
   * Gets the parent Node of a node
   */
  get parentNode(): Node {
    return this._parentNode
  }
}
