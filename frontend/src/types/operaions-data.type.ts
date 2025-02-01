export type OperationsDataType = {
    labels: string[];
    datasets: DatasetType[];
}

export type DatasetType = {
    label: string;
    data: number[];
    backgroundColor: string[];
    hoverOffset: number;
}
