CREATE TABLE IF NOT EXISTS links.links (
	id BIGINT UNSIGNED auto_increment NOT NULL COMMENT 'Primary ID',
	short_link varchar(100) NOT NULL COMMENT 'Short form for link',
	original_link varchar(2048) NOT NULL COMMENT 'Original link',
	statistics_link varchar(100) NOT NULL COMMENT 'Link for statistics',
	CONSTRAINT Links_PK PRIMARY KEY (id),
	CONSTRAINT Links_short_UN UNIQUE KEY (short_link),
	CONSTRAINT Links_statistics_UN UNIQUE KEY (statistics_link)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE INDEX IF NOT EXISTS Links_short_link_IDX USING BTREE ON links.links (short_link);

CREATE INDEX IF NOT EXISTS Links_statistics_link_IDX USING BTREE ON links.links (statistics_link);

CREATE TABLE IF NOT EXISTS links.statistics (
	record_id BIGINT UNSIGNED auto_increment NOT NULL COMMENT 'Record ID',
	link_id BIGINT UNSIGNED NOT NULL COMMENT 'Short link ID',
	`date` DATE NOT NULL COMMENT 'Date for click count',
	click_count INT UNSIGNED DEFAULT 1 NOT NULL COMMENT 'Click count',
	CONSTRAINT Statistics_PK PRIMARY KEY (record_id),
	CONSTRAINT Statistics_UN UNIQUE KEY (link_id,`date`),
	CONSTRAINT Statistics_FK FOREIGN KEY (link_id) REFERENCES links.links(id) ON DELETE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE INDEX IF NOT EXISTS  Statistics_link_id_IDX USING BTREE ON links.statistics (link_id,`date`);
