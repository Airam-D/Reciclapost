import * as SQLite from 'expo-sqlite';

export interface RegistroDescarte {
    id: number;
    material: string;
    quantidade: string;
    ecoponto: string;
}

let dbInstance: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
    if (dbInstance) return dbInstance;

    dbInstance = await SQLite.openDatabaseAsync('reciclaspot.db');

    await dbInstance.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS descartes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      material TEXT NOT NULL,
      quantidade TEXT NOT NULL,
      ecoponto TEXT NOT NULL
    );
  `);

    return dbInstance;
}

export const descarteDbService = {
    // READ (SELECT)
    listar: async (): Promise<RegistroDescarte[]> => {
        const db = await getDatabase();
        return await db.getAllAsync<RegistroDescarte>(
            'SELECT * FROM descartes ORDER BY id DESC;'
        );
    },

    // CREATE (INSERT)
    adicionar: async (material: string, quantidade: string, ecoponto: string): Promise<void> => {
        const db = await getDatabase();
        await db.runAsync(
            'INSERT INTO descartes (material, quantidade, ecoponto) VALUES (?, ?, ?);',
            [material.trim(), quantidade.trim(), ecoponto.trim()]
        );
    },

    // UPDATE
    atualizar: async (id: number, material: string, quantidade: string, ecoponto: string): Promise<void> => {
        const db = await getDatabase();
        await db.runAsync(
            'UPDATE descartes SET material = ?, quantidade = ?, ecoponto = ? WHERE id = ?;',
            [material.trim(), quantidade.trim(), ecoponto.trim(), id]
        );
    },

    // DELETE
    excluir: async (id: number): Promise<void> => {
        const db = await getDatabase();
        await db.runAsync('DELETE FROM descartes WHERE id = ?;', [id]);
    },
};