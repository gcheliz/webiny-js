// @flow
import { resolveCreate, resolveDelete, resolveGet, resolveUpdate } from "webiny-api/graphql";

import listFiles from "./resolvers/listFiles";

const fileFetcher = ctx => ctx.files.entities.File;
import {
    FileType,
    FileInputType,
    FileListResponseType,
    FileResponseType
} from "webiny-api-files/graphql";

export default {
    typeDefs: () => [FileType, FileInputType, FileListResponseType, FileResponseType],
    typeExtensions: `
        extend type FilesQuery {
            getFile(
                id: ID 
                where: JSON
                sort: String
            ): FileResponse
            
            listFiles(
                page: Int
                perPage: Int
                where: JSON
                sort: JSON
                search: String
            ): FileListResponse
        }
        
        extend type FilesMutation {
            createFile(
                data: FileInput!
            ): FileResponse
            
            updateFile(
                id: ID!
                data: FileInput!
            ): FileResponse
        
            deleteFile(
                id: ID!
            ): DeleteResponse
        }
    `,
    resolvers: {
        FilesQuery: {
            getFile: resolveGet(fileFetcher),
            listFiles: listFiles(fileFetcher)
        },
        FilesMutation: {
            createFile: resolveCreate(fileFetcher),
            updateFile: resolveUpdate(fileFetcher),
            deleteFile: resolveDelete(fileFetcher)
        }
    }
};
